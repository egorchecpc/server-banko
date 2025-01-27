import { Button } from '@/components/ui/button'
import { Download as DownloadIcon } from 'lucide-react'
import { GBVStageChartModule } from '@/modules/GBVStageChartModule/GBVStageChartModule'
import { GBVChartModule } from '@/modules/GBVChartModule/GBVChartModule'
import { useTranslation } from 'react-i18next'
import { useGetBIAnalyticsData } from '@/hooks/useGetBIAnalyticsData'
import VBSOKUChartModule from '@/modules/VBSOKUChart/VBSOKUChartModule'
import AveragePDChartModule from '@/modules/AveragePDChartModule/AveragePDChartModule'
import HeatmapChartModule from '@/modules/HeatmapChartModule/HeatmapChartModule'
import TotalAmountOverdueChartModule from '@/modules/TotalAmountOverdueChartModule/TotalAmountOverdueChartModule'
import AgeingAmountChartModule from '@/modules/AgeingAmountsChartModule/AgeingAmountChartModule'
import { DistributionCategoryChartModal } from '@/modules/DistributionCategoryChartModule/DistributionCategoryChartModule'
import { useState } from 'react'
import { BIAnalyticsSettings } from '@/modules/BISettings/BISettings'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from '@tanstack/react-router'

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
  const { t } = useTranslation()
  const { data, isLoading, isError } = useGetBIAnalyticsData()

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

  const handleChartVisibilityChange = (visibility: visabilitySettings) => {
    setChartVisibility(visibility)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error occurred while fetching data</div>
  }

  return (
    <div className="max-w-full">
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
        <Button variant="export" size="default">
          <div className="flex items-center gap-1">
            <DownloadIcon className="h-4 w-4" />
            <div>{t('biAnalytics.buttons.exportBtn')}</div>
          </div>
        </Button>
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
        {chartVisibility.ageingAmount && data.AgeingAmountData && (
          <div className="flex-1">
            <AgeingAmountChartModule data={data.AgeingAmountData} />
          </div>
        )}
        {chartVisibility.distributionCategory && data.CategoryItemsData && (
          <div className="flex-1">
            <DistributionCategoryChartModal data={data.CategoryItemsData} />
          </div>
        )}
      </div>
      <div className="mb-3"></div>
    </div>
  )
}
