import { useQuery } from '@tanstack/react-query'
import { ForecastDataResponse } from '@/models/PD'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetPDForecastData = () => {
  return useQuery<ForecastDataResponse, Error>({
    queryKey: ['PDForecastData'],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get(
        API_ENDPOINTS.DASHBOARD.PD.GET_FORECAST_PD
      )
      return data
    },
  })
}
