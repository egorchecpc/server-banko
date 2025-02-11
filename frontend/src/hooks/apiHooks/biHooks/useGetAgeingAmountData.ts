import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { ProductData } from '@/models/AgeingAmount'
import axios from 'axios'

export const useGetAgeingData = (date: string) => {
  const amountQuery = useQuery<ProductData[]>({
    queryKey: ['ageingAmountData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://banko-r-backend.stacklevel.group/api/ecl/grossCarryingAmount/sumByDelay?date=${date}`
      )
      return data
    },
  })

  const countQuery = useQuery<ProductData[]>({
    queryKey: ['ageingCountData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://banko-r-backend.stacklevel.group/api/ecl/loans/sumByDelay?date=${date}`
      )
      return data
    },
  })

  return {
    amountData: amountQuery.data,
    countData: countQuery.data,
    isLoading: amountQuery.isLoading || countQuery.isLoading,
    error: amountQuery.error || countQuery.error,
  }
}
