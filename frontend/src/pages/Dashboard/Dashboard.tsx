import { useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useMemo, useCallback } from 'react'

// Hooks
import { useGetDashboardData } from '@/hooks/useGetDashboardData'
import { useReportDataWithValidation } from '@/hooks/useReportData'
import { useReportId } from '@/context/ReportIdContext'
import { useLoading } from '@/context/LoadingContext'

// Components
import ECLDisplayModule from '@/modules/ECLDisplayModule/ECLDisplayModule'
import PCureDisplayModule from '@/modules/PCureDisplayModule/PCureDisplayModule'
import PDDisplayModuleTabs from '@/modules/PDDisplayModule/PDDisplayModuleTabs'
import LGDDisplayModuleTabs from '@/components/Tables/LGDTable/LGDDisplayModuleTabs'
import { DashboardSettings } from '@/modules/DashboardSettings/DashboardSettings'
import KPITable from '@/components/Tables/KPITable/KPITable'
import RiskGroupTable from '@/components/Tables/RiskGoupTable/RiskGroupTable'
import { ExportComponent } from '@/modules/ExportModule/ExportModule'

// Utils and processors
import { fixDate } from '@/utils/dateConverter'
import {
  processQuarterlyData,
  processYearlyData,
} from '@/modules/PDDisplayModule/multiplyPd'
import { processLgdData } from '@/components/Tables/LGDTable/multiplyLGD'

// Types
import { QuarterlyDataResponse, YearlyDataResponse } from '@/models/PD'
import { LGDItem } from '@/models/LGD'

// Types
interface VisibilitySettings {
  pd: boolean
  lgd: boolean
  pcure: boolean
  ecl: boolean
  kpi: boolean
  risk: boolean
}

interface ProcessedData {
  yearlyPDData: YearlyDataResponse
  quarterlyPDData: QuarterlyDataResponse
  creditTypeData?: Record<
    string,
    { yearlyPDData: YearlyDataResponse; quarterlyPDData: QuarterlyDataResponse }
  >
}

interface ProcessedLGDData {
  randomLGDData: LGDItem[]
  creditTypeLGDData?: Record<string, LGDItem[]>
}

// Constants
const DEFAULT_DATE = '01.01.2024'
const DEFAULT_VISIBILITY: VisibilitySettings = {
  pd: true,
  lgd: true,
  pcure: true,
  ecl: true,
  kpi: true,
  risk: true,
}

export const DashboardPage = () => {
  const { t } = useTranslation()
  const { reportId } = useParams({ strict: false })
  const { setReportId } = useReportId()
  const { setIsLoading } = useLoading()

  // Data fetching
  const { report } = useReportDataWithValidation(reportId || '')
  const reportDate = useMemo(() => {
    const basicReportDate = new Date(report?.debtorData.date || DEFAULT_DATE)
    const formattedDate = basicReportDate
      .toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      })
      .split('.')
      .reverse()
      .join('-')
    return fixDate(formattedDate)
  }, [report?.debtorData.date])

  const { data, isError, isLoading } = useGetDashboardData(reportDate)

  // State
  const [tableVisibility, setTableVisibility] =
    useState<VisibilitySettings>(DEFAULT_VISIBILITY)
  const [processedData, setProcessedData] = useState<ProcessedData>({
    yearlyPDData: {},
    quarterlyPDData: {},
  })
  const [processedLGDData, setProcessedLGDData] = useState<ProcessedLGDData>({
    randomLGDData: [],
  })

  // Memoized values
  const creditTypes = useMemo(
    () => report?.debtorData.creditType || [],
    [report?.debtorData.creditType]
  )

  const hasRequiredData = useMemo(
    () => data.yearlyPDData && data.quarterlyPDData && data.LGDData,
    [data.yearlyPDData, data.quarterlyPDData, data.LGDData]
  )

  // Callbacks
  const handleTableVisibilityChange = useCallback(
    (visibility: VisibilitySettings) => {
      setTableVisibility(visibility)
    },
    []
  )

  const processDataForCreditTypes = useCallback(
    (creditTypes: string[]) => {
      if (!hasRequiredData)
        return { creditTypeProcessedData: {}, creditTypeLGDData: {} }

      const creditTypeProcessedData: Record<
        string,
        {
          yearlyPDData: YearlyDataResponse
          quarterlyPDData: QuarterlyDataResponse
        }
      > = {}
      const creditTypeLGDData: Record<string, LGDItem[]> = {}

      creditTypes.forEach((type) => {
        creditTypeProcessedData[type] = {
          yearlyPDData: processYearlyData(
            data.yearlyPDData as YearlyDataResponse
          ),
          quarterlyPDData: processQuarterlyData(
            data.quarterlyPDData as QuarterlyDataResponse
          ),
        }
        creditTypeLGDData[type] = processLgdData(data.LGDData as LGDItem[])
      })

      return { creditTypeProcessedData, creditTypeLGDData }
    },
    [hasRequiredData, data.yearlyPDData, data.quarterlyPDData, data.LGDData]
  )

  // Effects
  useEffect(() => {
    setIsLoading(isLoading)
    return () => setIsLoading(false)
  }, [isLoading, setIsLoading])

  useEffect(() => {
    if (reportId) {
      setReportId(reportId)
    }
  }, [reportId, setReportId])

  useEffect(() => {
    if (!hasRequiredData) return

    // Process base data
    const processedYearlyData = processYearlyData(
      data.yearlyPDData as YearlyDataResponse
    )
    const processedQuarterlyData = processQuarterlyData(
      data.quarterlyPDData as QuarterlyDataResponse
    )
    const processedBaseLGDData = processLgdData(data.LGDData as LGDItem[])

    // Process credit type specific data
    const { creditTypeProcessedData, creditTypeLGDData } =
      processDataForCreditTypes(creditTypes)

    setProcessedData({
      yearlyPDData: processedYearlyData,
      quarterlyPDData: processedQuarterlyData,
      creditTypeData: creditTypeProcessedData,
    })

    setProcessedLGDData({
      randomLGDData: processedBaseLGDData,
      creditTypeLGDData,
    })
  }, [hasRequiredData, creditTypes, processDataForCreditTypes])

  // Render helpers
  const renderPDModule = () => {
    if (
      !tableVisibility.pd ||
      !data.yearlyPDData ||
      !data.quarterlyPDData ||
      !data.forecastPDData
    ) {
      return null
    }

    return (
      <div className="mb-3">
        <PDDisplayModuleTabs
          defaultData={{
            yearlyPDData: data.yearlyPDData,
            quarterlyPDData: data.quarterlyPDData,
            forecastPDData: data.forecastPDData,
          }}
          creditTypeData={processedData.creditTypeData}
          creditTypes={creditTypes}
        />
      </div>
    )
  }

  const renderLGDModule = () => {
    if (!tableVisibility.lgd || !data.LGDData) {
      return null
    }

    return (
      <div className="mb-3">
        <LGDDisplayModuleTabs
          defaultData={data.LGDData}
          creditTypeData={processedLGDData.creditTypeLGDData || {}}
          creditTypes={creditTypes}
        />
      </div>
    )
  }

  const renderPCureModule = () => {
    if (!tableVisibility.pcure) return null

    return (
      <div className="mb-3">
        <PCureDisplayModule />
      </div>
    )
  }

  const renderECLModule = () => {
    if (!tableVisibility.ecl || !data.eclDataV1 || !data.eclDataV2) {
      return null
    }

    return (
      <div className="mb-3">
        <ECLDisplayModule
          eclDataV1={data.eclDataV1}
          eclDataV2={data.eclDataV2}
          reportId={reportId || ''}
        />
      </div>
    )
  }

  const renderKPIModule = () => {
    if (!tableVisibility.kpi || !data.kpiData) {
      return null
    }

    return (
      <div className="mb-3">
        <KPITable data={data.kpiData} />
      </div>
    )
  }

  const renderRiskModule = () => {
    if (
      !tableVisibility.risk ||
      !data.eclAmount ||
      !data.percentIFRS ||
      !data.vbsAmount
    ) {
      return null
    }

    return (
      <div className="space-y-3">
        <RiskGroupTable data={data.vbsAmount} title="Сумма ВБС по МСФО" />
        <RiskGroupTable
          data={data.eclAmount}
          title="Сумма ожиданных кредитных убытков по МСФО"
        />
        <RiskGroupTable
          data={data.percentIFRS}
          title="Процент резервирования по МСФО"
          isPercent={true}
        />
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-lg text-red-600">
          {t('dashboard.error', 'Error occurred while fetching data')}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6 max-w-full px-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold leading-38 text-black-1000">
            {t('dashboard.title')}
          </h1>
          <DashboardSettings onVisibilityChange={handleTableVisibilityChange} />
        </div>
        <ExportComponent />
      </div>

      {/* Main Content */}
      <div className="space-y-3">
        {renderPDModule()}
        {renderLGDModule()}
        {renderPCureModule()}
        {renderECLModule()}
        {renderKPIModule()}
        {renderRiskModule()}
      </div>
    </div>
  )
}
