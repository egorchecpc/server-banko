import { useQuery } from '@tanstack/react-query'
import { YearlyDataResponse } from '@/models/PD'
import axios from 'axios'
import axiosConfig from '@/services/axiosConfig'

export const useGetPDYearlyData = () => {
  return useQuery<YearlyDataResponse, Error>({
    queryKey: ['PDYearlyData'],
    queryFn: async () => {
      const response = await axiosConfig.get<YearlyDataResponse>(
        '/probabilityDefault/yearly'
      )

      return Object.entries(response.data).reduce((acc, [year, data]) => {
        acc[year] = {
          cpd: data.cpd,
        }
        return acc
      }, {} as YearlyDataResponse)
    },
  })
}
