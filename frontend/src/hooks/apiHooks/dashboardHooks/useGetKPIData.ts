import { useQuery } from '@tanstack/react-query'
import axiosConfigMock from '@/services/axiosConfigMock'
import { KPIItem } from '@/models/KPI'

export const useGetKPIData = () => {
  return useQuery<KPIItem[], Error>({
    queryKey: ['KPIData'],
    queryFn: async () => {
      const { data } = await axiosConfigMock.get('/kpi')
      return data
    },
  })
}
