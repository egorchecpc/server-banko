import { useGetGBVData } from '@/hooks/apiHooks/useGetGBVData'
import { useGetGBVStageData } from '@/hooks/apiHooks/useGetGBVStageData'
import { useGetRiskMetricData } from '@/hooks/apiHooks/useGetRiskMetricData'
import { useGetVBSOKUData } from '@/hooks/apiHooks/useGetVBSOKUData'
import { useGetAveragePDData } from '@/hooks/apiHooks/useGetAvaragePDData'
import { useGetHeatmapData } from '@/hooks/apiHooks/useGetHeatmapData'
import { useGetYearlyAmountData } from '@/hooks/apiHooks/useGetAmountData'
import { useGetAmountPercentData } from '@/hooks/apiHooks/useGetAmountPercentData'
import { useGetAgeingAmountData } from '@/hooks/apiHooks/useGetAgeingAmountData'

export const useGetBIAnalyticsData = () => {
  const gbv = useGetGBVData()
  const gbvStage = useGetGBVStageData()
  const riskMetric = useGetRiskMetricData()
  const vbsOku = useGetVBSOKUData()
  const averagePd = useGetAveragePDData()
  const heatmap = useGetHeatmapData()
  const amountData = useGetYearlyAmountData()
  const amountPercentData = useGetAmountPercentData()
  const ageingAmountData = useGetAgeingAmountData()

  const data = {
    GBVData: gbv.data,
    GBVStageData: gbvStage.data,
    RiskMetricData: riskMetric.data,
    VBSOKUData: vbsOku.data,
    AveragePDData: averagePd.data,
    HeatmapData: heatmap.data,
    AmountData: amountData.data,
    AmountPercentData: amountPercentData.data,
    AgeingAmountData: ageingAmountData.data,
  }

  const isLoading = gbv.isLoading || gbvStage.isLoading || riskMetric.isLoading
  const isError = gbv.isError || gbvStage.isError || riskMetric.isError

  return {
    data,
    isLoading,
    isError,
  }
}
