import { useGetLGDData } from '@/hooks/apiHooks/dashboardHooks/useGetLGDData'
import { useGetPDYearlyData } from '@/hooks/apiHooks/dashboardHooks/useGetPDYearlyData'
import { useGetPDQuarterlyData } from '@/hooks/apiHooks/dashboardHooks/useGetPDQuarterlyData'
import { useGetECLDataV1 } from '@/hooks/apiHooks/dashboardHooks/useGetECLDataV1'
import { useGetECLDataV2 } from '@/hooks/apiHooks/dashboardHooks/useGetECLDataV2'
import { useGetPDForecastData } from '@/hooks/apiHooks/dashboardHooks/useGetPDForecastData'
import { useGetKPIData } from '@/hooks/apiHooks/dashboardHooks/useGetKPIData'
import { useGetRiskGroupData } from '@/hooks/apiHooks/dashboardHooks/useGetRiskGroupData'

export const useGetDashboardData = (date: string) => {
  const lgdData = useGetLGDData()
  const {
    eclAmount,
    percentIFRS,
    vbsAmount,
    isLoading: isRiskUpdates,
  } = useGetRiskGroupData(date)

  const kpiData = useGetKPIData()

  const yearlyPDData = useGetPDYearlyData()
  const quarterlyPDData = useGetPDQuarterlyData()
  const forecastPDData = useGetPDForecastData()

  const eclDataV1 = useGetECLDataV1(date)
  const eclDataV2 = useGetECLDataV2(date)

  const data = {
    LGDData: lgdData.data,
    yearlyPDData: yearlyPDData.data,
    quarterlyPDData: quarterlyPDData.data,
    forecastPDData: forecastPDData.data,
    eclDataV1: eclDataV1.data,
    eclDataV2: eclDataV2.data,
    kpiData: kpiData.data,
    eclAmount: eclAmount,
    percentIFRS: percentIFRS,
    vbsAmount: vbsAmount,
  }

  const isLoading =
    lgdData.isLoading ||
    yearlyPDData.isLoading ||
    quarterlyPDData.isLoading ||
    eclDataV1.isLoading ||
    eclDataV2.isLoading ||
    forecastPDData.isLoading ||
    isRiskUpdates
  const isError =
    lgdData.isError ||
    yearlyPDData.isError ||
    quarterlyPDData.isError ||
    eclDataV1.isError ||
    eclDataV2.isError ||
    forecastPDData.isError

  return {
    data,
    isLoading,
    isError,
  }
}
