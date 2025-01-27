import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { KPIItem } from '@/models/KPI'

export const useGetKPIData = () => {
  return useQuery<KPIItem[], Error>({
    queryKey: ['KPIData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get('/kpi')
      return data
    },
  })
}
