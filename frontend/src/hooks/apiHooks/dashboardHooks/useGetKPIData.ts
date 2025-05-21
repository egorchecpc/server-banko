import { useQuery } from '@tanstack/react-query'
import axiosConfigMock from '@/services/axiosConfigMock'
import { KPIItem } from '@/models/KPI'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetKPIData = () => {
  return useQuery<KPIItem[], Error>({
    queryKey: ['KPIData'],
    queryFn: async () => {
      const { data } = await axiosConfigMock.get(
        API_ENDPOINTS.DASHBOARD.KPI.GET_KPI
      )
      return data
    },
  })
}
