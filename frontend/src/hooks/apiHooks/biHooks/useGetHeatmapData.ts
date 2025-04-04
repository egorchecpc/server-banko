import { useQuery } from '@tanstack/react-query'
import { HeatmapData } from '@/models/Heatmap'
import { transformHeatmapData } from '@/utils/formatHeatmapDataFromServer'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetHeatmapData = () => {
  return useQuery<HeatmapData, Error>({
    queryKey: ['heatmapData'],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get(
        API_ENDPOINTS.BI.ECL_CHARTS.GET_HEATMAP
      )
      return transformHeatmapData(data).heatmapData
    },
  })
}
