import { useQuery } from '@tanstack/react-query'
import { ProductData } from '@/models/AgeingAmount'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetAgeingData = (date: string) => {
  const amountQuery = useQuery<ProductData[]>({
    queryKey: ['ageingAmountData', date],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get(
        API_ENDPOINTS.BI.ECL_CHARTS.GET_GROSS_CARRYING_AMOUNT,
        { params: { date } }
      )
      return data
    },
  })

  const countQuery = useQuery<ProductData[]>({
    queryKey: ['ageingCountData', date],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get(
        API_ENDPOINTS.BI.ECL_CHARTS.GET_LOANS,
        {
          params: { date },
        }
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
