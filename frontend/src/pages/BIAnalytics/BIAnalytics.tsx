import { GBVStageChartModule } from '@/modules/GBVStageChartModule/GBVStageChartModule'
import { GBVChartModule } from '@/modules/GBVChartModule/GBVChartModule'
import { useGetBIAnalyticsData } from '@/hooks/useGetBIAnalyticsData'
import VBSOKUChartModule from '@/modules/VBSOKUChart/VBSOKUChartModule'
import AveragePDChartModule from '@/modules/AveragePDChartModule/AveragePDChartModule'
import HeatmapChartModule from '@/modules/HeatmapChartModule/HeatmapChartModule'
import TotalAmountOverdueChartModule from '@/modules/TotalAmountOverdueChartModule/TotalAmountOverdueChartModule'
import AgeingAmountChartModule from '@/modules/AgeingAmountsChartModule/AgeingAmountChartModule'
import { useCallback, useEffect, useState } from 'react'
import { BIAnalyticsSettings } from '@/modules/BISettings/BISettings'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link, useParams } from '@tanstack/react-router'
import { DistributionCategoryChartModule } from '@/modules/DistributionCategoryChartModule/DistributionCategoryChartModule'
import { useReportDataWithValidation } from '@/hooks/apiHooks/commonHooks/useReportData'
import { fixDate } from '@/utils/dateConverter'
import { useLoading } from '@/context/LoadingContext'

interface visabilitySettings {
  gbv: boolean
  gbvStage: boolean
  vbsoku: boolean
  averagePD: boolean
  heatmap: boolean
  totalAmountOverdue: boolean
  ageingAmount: boolean
  distributionCategory: boolean
}

export const BIAnalyticsPage = () => {
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
  const { data, isLoading, isError } = useGetBIAnalyticsData(date)
  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(isLoading)
    return () => {
      setIsLoading(false) // Сбрасываем при размонтировании
    }
  }, [isLoading, setIsLoading])

  const [chartVisibility, setChartVisibility] = useState({
    gbv: true,
    gbvStage: true,
    vbsoku: true,
    averagePD: true,
    heatmap: true,
    totalAmountOverdue: true,
    ageingAmount: true,
    distributionCategory: true,
  })

  const handleChartVisibilityChange = useCallback(
    (visibility: visabilitySettings) => {
      setChartVisibility((prev) => ({ ...prev, ...visibility }))
    },
    []
  )

  if (isLoading) {
    return <div></div>
  }
  if (isError) {
    return <div>Error occurred while fetching data</div>
  }
  return (
    <div className="max-w-full px-10">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/reports">Главная страница</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>BI-аналитика</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <div className="mb-3 flex items-center gap-3">
          <div className="text-2xl font-bold leading-38 text-black-900">
            BI-аналитика
          </div>
          <div className="mt-3">
            <BIAnalyticsSettings
              onVisibilityChange={handleChartVisibilityChange}
            />
          </div>
        </div>
      </div>
      <div className="mb-3 flex gap-3">
        {chartVisibility.gbv && data.GBVData && (
          <div className="flex-4">
            <GBVChartModule data={data.GBVData} />
          </div>
        )}
        {chartVisibility.gbvStage && data.GBVStageData && (
          <div className="flex-1">
            <GBVStageChartModule data={data.GBVStageData} />
          </div>
        )}
      </div>
      {chartVisibility.vbsoku && data.VBSOKUData && (
        <div className="flex-1">
          <VBSOKUChartModule data={data.VBSOKUData} />
        </div>
      )}
      <div className="mb-3"></div>
      {chartVisibility.averagePD && data.AveragePDData && (
        <div className="flex-1">
          <AveragePDChartModule data={data.AveragePDData} />
        </div>
      )}
      <div className="mb-3"></div>
      {chartVisibility.heatmap && data.HeatmapData && (
        <div className="flex-1">
          <HeatmapChartModule data={data.HeatmapData} />
        </div>
      )}
      <div className="mb-3"></div>
      {chartVisibility.totalAmountOverdue &&
        data.AmountData &&
        data.AmountPercentData && (
          <TotalAmountOverdueChartModule
            absoluteData={data.AmountData}
            percentageData={data.AmountPercentData}
          />
        )}
      <div className="mb-3"></div>
      <div className="mb-3 flex gap-3">
        {chartVisibility.ageingAmount &&
          data.AgeingAmountData &&
          data.AgeingCountData && (
            <div className="flex-1">
              <AgeingAmountChartModule
                amountData={data.AgeingAmountData}
                countData={data.AgeingCountData}
              />
            </div>
          )}
        {chartVisibility.distributionCategory &&
          data.CategoryAmountData &&
          data.CategoryCountData && (
            <div className="flex-1">
              <DistributionCategoryChartModule
                amountData={data.CategoryAmountData}
                countData={data.CategoryCountData}
              />
            </div>
          )}
      </div>
      <div className="mb-3"></div>
    </div>
  )
}
