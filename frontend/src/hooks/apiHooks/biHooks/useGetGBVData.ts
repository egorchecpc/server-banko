import { useQuery } from '@tanstack/react-query'
import { GBVData } from '@/models/GBV'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetGBVData = (date: string) => {
  return useQuery<GBVData[], Error>({
    queryKey: ['GBVData', date],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get(
        API_ENDPOINTS.BI.ECL_CHARTS.GET_GROSS_CARRYING_AMOUNT_DEFAULT,
        { params: { date } }
      )
      return data
    },
  })
}
