import { useQuery } from '@tanstack/react-query'
import { ForecastDataResponse } from '@/models/PD'
import axiosConfigFinal from '@/services/axiosConfigFinal'

export const useGetPDForecastData = () => {
  return useQuery<ForecastDataResponse, Error>({
    queryKey: ['PDForecastData'],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get(
        '/probabilityDefault/forecast'
      )
      return data
    },
  })
}
