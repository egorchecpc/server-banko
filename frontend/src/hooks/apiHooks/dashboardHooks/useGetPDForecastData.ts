import { useQuery } from '@tanstack/react-query'
import { ForecastDataResponse } from '@/models/PD'
import axiosConfig from '@/services/axiosConfig'
import axios from 'axios'

export const useGetPDForecastData = () => {
  return useQuery<ForecastDataResponse, Error>({
    queryKey: ['PDForecastData'],
    queryFn: async () => {
      const { data } = await axios.get(
        'http://192.168.100.18/api/probabilityDefault/forecast'
      )
      return data
    },
  })
}
