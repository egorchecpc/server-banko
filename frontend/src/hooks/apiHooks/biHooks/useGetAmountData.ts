import { useQuery } from '@tanstack/react-query'
import axiosConfigMock from '@/services/axiosConfigMock'
import { YearlyProductData } from '@/models/Amount'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetYearlyAmountData = () => {
  return useQuery<YearlyProductData[]>({
    queryKey: ['yearlyAmountData'],
    queryFn: async () => {
      const { data } = await axiosConfigMock.get(
        API_ENDPOINTS.BI.AMOUNT_CHARTS.GET_AMOUNT_CHART
      )
      return data
    },
  })
}
