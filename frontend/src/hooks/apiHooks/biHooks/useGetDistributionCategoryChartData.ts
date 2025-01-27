import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { CategoryChartItem } from '@/models/CategoryChartItem'

export const useGetDistributionCategoryChartData = () => {
  return useQuery<CategoryChartItem[], Error>({
    queryKey: ['CategoryData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get('/category-chart')
      return data
    },
  })
}
