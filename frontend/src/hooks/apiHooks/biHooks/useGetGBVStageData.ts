import { useQuery } from '@tanstack/react-query'
import axiosConfigMock from '@/services/axiosConfigMock'
import { API_ENDPOINTS } from '@/services/endpoints'
import { GBVStageData } from '@/models/GBVStage'

export const useGetGBVStageData = () => {
  return useQuery<GBVStageData[], Error>({
    queryKey: ['GBVStageData'],
    queryFn: async () => {
      const { data } = await axiosConfigMock.get(API_ENDPOINTS.BI.GET_GBV_STAGE)
      return data
    },
  })
}
