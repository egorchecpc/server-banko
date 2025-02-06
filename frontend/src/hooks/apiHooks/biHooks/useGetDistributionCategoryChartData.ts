import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { CategoryChartItem } from '@/models/CategoryChartItem'
import axios from 'axios'

export const useGetCategoryChartData = () => {
  const amountQuery = useQuery<CategoryChartItem[]>({
    queryKey: ['categoryAmountChartData'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://banko-backend.stacklevel.group/category-amount-chart'
      )
      return data
    },
  })

  const countQuery = useQuery<CategoryChartItem[]>({
    queryKey: ['categoryCountChartData'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://banko-backend.stacklevel.group/category-count-chart'
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
