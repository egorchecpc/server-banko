import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { API_ENDPOINTS } from '@/services/endpoints'
import { LGDItem } from '@/models/LGD'

export const useGetLGDData = () => {
  return useQuery<LGDItem[], Error>({
    queryKey: ['LGDData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get(API_ENDPOINTS.GET_LGD_DATA)

      await new Promise((resolve) => setTimeout(resolve, 50))

      return data
    },
  })
}
