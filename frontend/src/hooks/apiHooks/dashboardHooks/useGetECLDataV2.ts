import { useQuery } from '@tanstack/react-query'
import { ECLData } from '@/models/ECL'
import { transformECLDataFromServer } from '@/utils/formatECLFromServer'
import { ECLType } from '@/models/FormatedECL'
import axiosConfigFinal from '@/services/axiosConfigFinal'

export const useGetECLDataV2 = (date: string) => {
  return useQuery<ECLData, Error>({
    queryKey: ['ECLDataV2', date],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get(
        `/ecl/portfolio/summary?date=${date}`
      )
      return transformECLDataFromServer(data, ECLType.DELAY)
    },
    enabled: !!date,
  })
}
