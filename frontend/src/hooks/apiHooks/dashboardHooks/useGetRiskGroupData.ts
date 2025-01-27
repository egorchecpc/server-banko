import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { RiskGroupItem } from '@/models/RiskGoupItem'

export const useGetRiskGroupData = () => {
  return useQuery<RiskGroupItem[], Error>({
    queryKey: ['RiskGroupData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get('/risk-group')
      return data
    },
  })
}
