import { useQuery } from '@tanstack/react-query'
import { QuarterlyDataResponse } from '@/models/PD'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetPDQuarterlyData = () => {
  return useQuery<QuarterlyDataResponse, Error>({
    queryKey: ['PDQuarterlyData'],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get(
        API_ENDPOINTS.DASHBOARD.PD.GET_QUARTERLY_PD
      )
      return data
    },
  })
}
