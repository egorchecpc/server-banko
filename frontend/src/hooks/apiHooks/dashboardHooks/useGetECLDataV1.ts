import { useQuery } from '@tanstack/react-query'
import { ECLData } from '@/models/ECL'
import { transformECLDataFromServer } from '@/utils/formatECLFromServer'
import { ECLType } from '@/models/FormatedECL'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetECLDataV1 = (date: string) => {
  return useQuery<ECLData, Error>({
    queryKey: ['ECLDataV1', date],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get(
        API_ENDPOINTS.DASHBOARD.ECL.GET_ECL_SUMMARY(date)
      )

      // TODO: Add filtering logic here if needed
      return transformECLDataFromServer(data, ECLType.PRODUCT)
    },
    enabled: !!date,
  })
}
