import { Button } from '@/components/ui/button'
import PDDisplayModule from '@/modules/PDDisplayModule/PDDisplayModule'
import LGDTable from '@/components/Tables/LGDTable/LGDTable'
import { Link, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useGetDashboardData } from '@/hooks/useGetDashboardData'
import ECLDisplayModule from '@/modules/ECLDisplayModule/ECLDisplayModule'
import PCureDisplayModule from '@/modules/PCureDisplayModule/PCureDisplayModule'
import { useEffect, useState } from 'react'
import { useReportId } from '@/context/ReportIdContext'
import { DashboardSettings } from '@/modules/DashboardSettings/DashboardSettings'
import KPITable from '@/components/Tables/KPITable/KPITable'
import RiskGroupTable from '@/components/Tables/RiskGoupTable/RiskGroupTable'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ExportComponent } from '@/modules/ExportModule/ExportModule'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'

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
  const { data, isLoading, isError } = useGetDashboardData()
  const [tableVisibility, setTableVisibility] = useState({
    pd: true,
    lgd: true,
    pcure: true,
    ecl: true,
    kpi: true,
    risk: true,
  })
  const { setReportId } = useReportId()
  const { reportId } = useParams({ strict: false })
  useEffect(() => {
    if (reportId) {
      setReportId(reportId)
    }
  }, [reportId])

  const handleTableVisibilityChange = (visibility: VisibilitySettings) => {
    setTableVisibility(visibility)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (isError) {
    return <div>Error occurred while fetching data</div>
  }
  return (
    <div className="mb-6 max-w-full px-10">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/reports">Главная страница</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t('dashboard.title')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <div className="mb-3 flex items-center gap-3">
          <div className="text-2xl font-bold leading-38 text-black-900">
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
            <PDDisplayModule
              yearlyPDData={data.yearlyPDData}
              quarterlyPDData={data.quarterlyPDData}
              forecastPDData={data.forecastPDData}
            />
          </div>
        )}
      {tableVisibility.lgd && data.LGDData && (
        <div className="flex-1">
          <LGDTable data={data.LGDData} />
        </div>
      )}
      <div className="">{tableVisibility.pcure && <PCureDisplayModule />}</div>
      {tableVisibility.ecl && (
        <div className="w-full rounded-lg border bg-grey-300/40 p-1.5">
          <div className="my-2 ml-4 flex items-center justify-between">
            <div className="text-xl font-bold leading-24 text-black-800">
              {t('dashboard.tables.eclTable.title')}
            </div>
            <Button variant="export" size="default">
              <Link to={`/reports/${reportId}/credit-list`}>
                {t('dashboard.creditListBtn')}
              </Link>
            </Button>
          </div>
          {data.eclDataV1 && data.eclDataV2 && (
            <ECLDisplayModule
              eclDataV1={data.eclDataV1}
              eclDataV2={data.eclDataV2}
            />
          )}
        </div>
      )}
      <div className="mt-3" />
      {tableVisibility.kpi && data.kpiData && (
        <div className="">
          <KPITable data={data.kpiData} />
        </div>
      )}
      <div className="mt-3" />
      {tableVisibility.risk && data.riskGroupData && (
        <div className="">
          <RiskGroupTable
            data={data.riskGroupData}
            title="Сумма задолженности ВБС по МСФО"
          />
          <div className="mt-3" />
          <RiskGroupTable
            data={data.riskGroupData}
            title="Сумма ожидаемых кредитных убытков по МСФО"
          />
          <div className="mt-3" />
          <RiskGroupTable
            data={data.riskGroupData}
            title="Процент резервирования по МСФО"
          />
        </div>
      )}
    </div>
  )
}
