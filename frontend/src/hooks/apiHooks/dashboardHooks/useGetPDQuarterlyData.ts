import { useQuery } from '@tanstack/react-query'
import { QuarterlyDataResponse } from '@/models/PD'
import axiosConfigFinal from '@/services/axiosConfigFinal'

export const useGetPDQuarterlyData = () => {
  return useQuery<QuarterlyDataResponse, Error>({
    queryKey: ['PDQuarterlyData'],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get(
        'https://banko-r-backend.stacklevel.group/api/probabilityDefault/quarterly'
      )
      return data
    },
  })
}
