import { useQuery } from '@tanstack/react-query'
import { ForecastDataResponse } from '@/models/PD'
import axiosConfig from '@/services/axiosConfig'
import axios from 'axios'

export const useGetPDForecastData = () => {
  return useQuery<ForecastDataResponse, Error>({
    queryKey: ['PDForecastData'],
    queryFn: async () => {
      const { data } = await axios.get(
        'http://localhost:3000/probabilityDefault/forecast'
      )
      return data
    },
  })
}
