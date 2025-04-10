import { useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useGetDashboardData } from '@/hooks/useGetDashboardData'
import ECLDisplayModule from '@/modules/ECLDisplayModule/ECLDisplayModule'
import PCureDisplayModule from '@/modules/PCureDisplayModule/PCureDisplayModule'
import { useEffect, useState } from 'react'
import { useReportId } from '@/context/ReportIdContext'
import { DashboardSettings } from '@/modules/DashboardSettings/DashboardSettings'
import KPITable from '@/components/Tables/KPITable/KPITable'
import RiskGroupTable from '@/components/Tables/RiskGoupTable/RiskGroupTable'
import { ExportComponent } from '@/modules/ExportModule/ExportModule'
import { useReportDataWithValidation } from '@/hooks/useReportData'
import { fixDate } from '@/utils/dateConverter'
import { QuarterlyDataResponse, YearlyDataResponse } from '@/models/PD'
import { LGDItem } from '@/models/LGD'
import {
  processQuarterlyData,
  processYearlyData,
} from '@/modules/PDDisplayModule/multiplyPd'
import { processLgdData } from '@/components/Tables/LGDTable/multiplyLGD'
import { useLoading } from '@/context/LoadingContext'
import PDDisplayModuleTabs from '@/modules/PDDisplayModule/PDDisplayModuleTabs'
import LGDDisplayModuleTabs from '@/components/Tables/LGDTable/LGDDisplayModuleTabs'

interface VisibilitySettings {
  pd: boolean
  lgd: boolean
  pcure: boolean
  ecl: boolean
  kpi: boolean
  risk: boolean
}

export const DashboardPage = () => {
  const { t } = useTranslation()
  const { reportId } = useParams({ strict: false })
  const { report } = useReportDataWithValidation(reportId || '')
  const basicReportDate = new Date(report?.debtorData.date || '01.01.2024')
  const reportDate = basicReportDate
    .toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC',
    })
    .split('.')
    .reverse()
    .join('-')
  const date = fixDate(reportDate)
  const { data, isError, isLoading } = useGetDashboardData(date)
  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(isLoading)
    return () => {
      setIsLoading(false) // Сбрасываем при размонтировании
    }
  }, [isLoading, setIsLoading])

  const [tableVisibility, setTableVisibility] = useState({
    pd: true,
    lgd: true,
    pcure: true,
    ecl: true,
    kpi: true,
    risk: true,
  })
  const { setReportId } = useReportId()

  // В DashboardPage.tsx добавьте:
  const [processedData, setProcessedData] = useState({
    yearlyPDData: null,
    quarterlyPDData: null,
  })

  const [randomLGDData, setRandomLGDData] = useState({
    randomLGDData: null,
  })

  // Используйте useEffect для обработки данных только при изменении исходных данных
  useEffect(() => {
    if (data.yearlyPDData && data.quarterlyPDData && data.LGDData) {
      // Обрабатываем данные один раз и сохраняем результат
      const processedYearlyData = processYearlyData(
        data.yearlyPDData as YearlyDataResponse
      )
      const processedQuarterlyData = processQuarterlyData(
        data.quarterlyPDData as QuarterlyDataResponse
      )
      const processedLGDData = processLgdData(data.LGDData as LGDItem[])
      // Создаем объект с обработанными данными для каждого типа кредита
      const creditTypeProcessedData = {}
      const creditTypeLGDData = {}
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
      setRandomLGDData({
        randomLGDData: processedLGDData,
        creditTypeLGDData: creditTypeLGDData,
      })
      setProcessedData({
        yearlyPDData: processedYearlyData,
        quarterlyPDData: processedQuarterlyData,
        creditTypeData: creditTypeProcessedData,
      })
    }
  }, [data.yearlyPDData, data.quarterlyPDData])

  useEffect(() => {
    if (reportId) {
      setReportId(reportId)
    }
  }, [reportId])

  const handleTableVisibilityChange = (visibility: VisibilitySettings) => {
    setTableVisibility(visibility)
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>
  }

  const creditTypes = report?.debtorData.creditType || []

  return (
    <div className="mb-6 max-w-full px-10">
      <div className="flex items-center justify-between">
        <div className="mb-3 flex items-center gap-3">
          <div className="text-2xl font-bold leading-38 text-black-1000">
            {t('dashboard.title')}
          </div>
          <div className="mt-3">
            <DashboardSettings
              onVisibilityChange={handleTableVisibilityChange}
            />
          </div>
        </div>
        <ExportComponent />
      </div>
      {tableVisibility.pd &&
        data.yearlyPDData &&
        data.quarterlyPDData &&
        data.forecastPDData && (
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
        )}
      {tableVisibility.lgd && data.LGDData && (
        <LGDDisplayModuleTabs
          defaultData={data.LGDData}
          creditTypeData={randomLGDData.creditTypeLGDData || {}}
          creditTypes={creditTypes}
        />
      )}

      <div className="">{tableVisibility.pcure && <PCureDisplayModule />}</div>
      {tableVisibility.ecl && data.eclDataV1 && data.eclDataV2 && (
        <ECLDisplayModule
          eclDataV1={data.eclDataV1}
          eclDataV2={data.eclDataV2}
          reportId={reportId as string}
        />
      )}
      <div className="mt-3" />
      {tableVisibility.kpi && data.kpiData && (
        <div className="">
          <KPITable data={data.kpiData} />
        </div>
      )}
      <div className="mt-3" />
      {tableVisibility.risk &&
        data.eclAmount &&
        data.percentIFRS &&
        data.vbsAmount && (
          <div className="">
            <RiskGroupTable data={data.vbsAmount} title="Сумма ВБС по МСФО" />
            <div className="mt-3" />
            <RiskGroupTable
              data={data.eclAmount}
              title="Сумма ожидаемых кредитных убытков по МСФО"
            />
            <div className="mt-3" />
            <RiskGroupTable
              data={data.percentIFRS}
              title="Процент резервирования по МСФО"
              isPercent={true}
            />
          </div>
        )}
    </div>
  )
}
