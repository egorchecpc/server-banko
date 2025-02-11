import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { HeatmapData } from '@/models/Heatmap'
import { transformHeatmapData } from '@/utils/formatHeatmapDataFromServer'
import axios from 'axios'

export const useGetHeatmapData = () => {
  return useQuery<HeatmapData, Error>({
    queryKey: ['heatmapData'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://banko-r-backend.stacklevel.group/api/ecl/heatMap'
      )
      return transformHeatmapData(data).heatmapData
    },
  })
}
