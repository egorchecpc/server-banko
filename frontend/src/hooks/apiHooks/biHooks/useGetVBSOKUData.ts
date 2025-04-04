import { useQuery } from '@tanstack/react-query'
import axiosConfigMock from '@/services/axiosConfigMock'
import { VBSOKUDataItem } from '@/models/VBSOKU'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetVBSOKUData = () => {
  return useQuery<VBSOKUDataItem[], Error>({
    queryKey: ['VBSOKUData'],
    queryFn: async () => {
      const { data } = await axiosConfigMock.get(API_ENDPOINTS.BI.GET_VBS_OKU)
      return data
    },
  })
}
