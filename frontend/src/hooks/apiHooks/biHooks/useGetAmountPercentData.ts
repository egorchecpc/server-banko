import { useQuery } from '@tanstack/react-query'
import axiosConfigMock from '@/services/axiosConfigMock'
import { YearlyProductPercentage } from '@/models/Amount'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetAmountPercentData = () => {
  return useQuery<YearlyProductPercentage[]>({
    queryKey: ['percentAmountData'],
    queryFn: async () => {
      const { data } = await axiosConfigMock.get(
        API_ENDPOINTS.BI.AMOUNT_CHARTS.GET_AMOUNT_CHART_PERCENT
      )
      return data
    },
  })
}
