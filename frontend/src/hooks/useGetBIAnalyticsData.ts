import { useGetGBVData } from '@/hooks/apiHooks/biHooks/useGetGBVData'
import { useGetGBVStageData } from '@/hooks/apiHooks/biHooks/useGetGBVStageData'
import { useGetVBSOKUData } from '@/hooks/apiHooks/biHooks/useGetVBSOKUData'
import { useGetAveragePDData } from '@/hooks/apiHooks/biHooks/useGetAvaragePDData'
import { useGetHeatmapData } from '@/hooks/apiHooks/biHooks/useGetHeatmapData'
import { useGetYearlyAmountData } from '@/hooks/apiHooks/biHooks/useGetAmountData'
import { useGetAmountPercentData } from '@/hooks/apiHooks/biHooks/useGetAmountPercentData'
import { useGetAgeingData } from '@/hooks/apiHooks/biHooks/useGetAgeingAmountData'
import { useGetCategoryChartData } from '@/hooks/apiHooks/biHooks/useGetDistributionCategoryChartData'

export const useGetBIAnalyticsData = () => {
  const gbv = useGetGBVData()
  const gbvStage = useGetGBVStageData()
  const vbsOku = useGetVBSOKUData()
  const averagePd = useGetAveragePDData()
  const heatmap = useGetHeatmapData()
  const amountData = useGetYearlyAmountData()
  const amountPercentData = useGetAmountPercentData()
  const { amountData: ageingAmountData, countData: ageingCountData } =
    useGetAgeingData()
  const { amountData: categoryAmountData, countData: categoryCountData } =
    useGetCategoryChartData()

  const data = {
    GBVData: gbv.data,
    GBVStageData: gbvStage.data,
    VBSOKUData: vbsOku.data,
    AveragePDData: averagePd.data,
    HeatmapData: heatmap.data,
    AmountData: amountData.data,
    AmountPercentData: amountPercentData.data,
    AgeingAmountData: ageingAmountData,
    AgeingCountData: ageingCountData,
    CategoryAmountData: categoryAmountData,
    CategoryCountData: categoryCountData,
  }

  const isLoading =
    gbv.isLoading ||
    gbvStage.isLoading ||
    vbsOku.isLoading ||
    averagePd.isLoading ||
    heatmap.isLoading
  const isError = gbv.isError || gbvStage.isError

  return {
    data,
    isLoading,
    isError,
  }
}
