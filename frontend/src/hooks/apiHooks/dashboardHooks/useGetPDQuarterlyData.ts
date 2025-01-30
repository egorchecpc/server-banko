import { useQuery } from '@tanstack/react-query'
import { QuarterlyDataResponse } from '@/models/PD'
import axiosConfig from '@/services/axiosConfig'
import axios from 'axios'

export const useGetPDQuarterlyData = () => {
  return useQuery<QuarterlyDataResponse, Error>({
    queryKey: ['PDQuarterlyData'],
    queryFn: async () => {
      const { data } = await axios.get(
        'http://192.168.100.18/api/probabilityDefault/quarterly'
      )
      return data
    },
  })
}
