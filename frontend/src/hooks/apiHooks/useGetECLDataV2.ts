import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { API_ENDPOINTS } from '@/services/endpoints'
import { ECLData } from '@/models/ECL'

export const useGetECLDataV2 = () => {
  return useQuery<ECLData, Error>({
    queryKey: ['ECLData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get(API_ENDPOINTS.GET_ECL_DATA_V2)
      return data
    },
  })
}
