import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { HeatmapData } from '@/models/Heatmap'

export const useGetHeatmapData = () => {
  return useQuery<HeatmapData, Error>({
    queryKey: ['heatmapData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get('/heatmap')
      return data.heatmapData
    },
  })
}
