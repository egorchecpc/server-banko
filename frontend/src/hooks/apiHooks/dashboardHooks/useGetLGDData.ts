import { useQuery } from '@tanstack/react-query'
import axiosConfigMock from '@/services/axiosConfigMock'
import { API_ENDPOINTS } from '@/services/endpoints'
import { LGDItem } from '@/models/LGD'

export const useGetLGDData = () => {
  return useQuery<LGDItem[], Error>({
    queryKey: ['LGDData'],
    queryFn: async () => {
      const { data } = await axiosConfigMock.get(API_ENDPOINTS.GET_LGD_DATA)

      await new Promise((resolve) => setTimeout(resolve, 50))

      return data
    },
  })
}
