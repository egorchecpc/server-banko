import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { YearlyProductData } from '@/models/Amount'

export const useGetYearlyAmountData = () => {
  return useQuery<YearlyProductData[]>({
    queryKey: ['yearlyAmountData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get('/amount-chart')
      return data
    },
  })
}
