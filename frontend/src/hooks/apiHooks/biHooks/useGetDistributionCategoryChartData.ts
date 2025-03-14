import { useQuery } from '@tanstack/react-query'
import { CategoryChartItem } from '@/models/CategoryChartItem'
import axios from 'axios'

export const useGetCategoryChartData = (date: string) => {
  const amountQuery = useQuery<CategoryChartItem[]>({
    queryKey: ['categoryAmountChartData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://banko-r-backend.stacklevel.group/api/ecl/grossCarryingAmount/sumByDelay?date=${date}`
      )
      return data
    },
  })

  const countQuery = useQuery<CategoryChartItem[]>({
    queryKey: ['categoryCountChartData'],
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
