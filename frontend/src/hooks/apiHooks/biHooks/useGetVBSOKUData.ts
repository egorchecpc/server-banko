import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { VBSOKUDataItem } from '@/models/VBSOKU'

export const useGetVBSOKUData = () => {
  return useQuery<VBSOKUDataItem[], Error>({
    queryKey: ['VBSOKUData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get('/vbs')
      return data
    },
  })
}
