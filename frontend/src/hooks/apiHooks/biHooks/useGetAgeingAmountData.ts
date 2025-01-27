import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { ProductData } from '@/models/AgeingAmount'

export const useGetAgeingAmountData = () => {
  return useQuery<ProductData[]>({
    queryKey: ['ageingAmountData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get('/ageing-amount-chart')
      return data
    },
  })
}
