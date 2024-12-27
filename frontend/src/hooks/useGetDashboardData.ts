import { useGetLGDData } from '@/hooks/apiHooks/useGetLGDData'
import { useGetPDYearlyData } from '@/hooks/apiHooks/useGetPDYearlyData'
import { useGetPDQuarterlyData } from '@/hooks/apiHooks/useGetPDQuarterlyData'
import { useGetECLDataV1 } from '@/hooks/apiHooks/useGetECLDataV1'
import { useGetECLDataV2 } from '@/hooks/apiHooks/useGetECLDataV2'
import { useGetPDForecastData } from '@/hooks/apiHooks/useGetPDForecastData'

export const useGetDashboardData = () => {
  const lgdData = useGetLGDData()

  const yearlyPDData = useGetPDYearlyData()
  const quarterlyPDData = useGetPDQuarterlyData()
  const forecastPDData = useGetPDForecastData()

  const eclDataV1 = useGetECLDataV1()
  const eclDataV2 = useGetECLDataV2()

  const data = {
    LGDData: lgdData.data,
    yearlyPDData: yearlyPDData.data,
    quarterlyPDData: quarterlyPDData.data,
    forecastPDData: forecastPDData.data,
    eclDataV1: eclDataV1.data,
    eclDataV2: eclDataV2.data,
  }

  const isLoading =
    lgdData.isLoading ||
    yearlyPDData.isLoading ||
    quarterlyPDData.isLoading ||
    eclDataV1.isLoading ||
    eclDataV2.isLoading ||
    forecastPDData.isLoading
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
