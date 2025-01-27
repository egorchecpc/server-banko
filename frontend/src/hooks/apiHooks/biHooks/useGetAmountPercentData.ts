import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { YearlyProductPercentage } from '@/models/Amount'

export const useGetAmountPercentData = () => {
  return useQuery<YearlyProductPercentage[]>({
    queryKey: ['percentAmountData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get('/amount-chart-p')
      return data
    },
  })
}
