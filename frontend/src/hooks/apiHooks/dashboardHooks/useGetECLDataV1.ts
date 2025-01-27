import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { API_ENDPOINTS } from '@/services/endpoints'
import { ECLData } from '@/models/ECL'

export const useGetECLDataV1 = () => {
  return useQuery<ECLData, Error>({
    queryKey: ['ECLDataV1'],
    queryFn: async () => {
      const { data } = await axiosConfig.get(API_ENDPOINTS.GET_ECL_DATA_V1)
      return data
    },
  })
}
