import { useQuery } from '@tanstack/react-query'
import { AveragePD } from '@/models/AveragePD'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetAveragePDData = () => {
  return useQuery<AveragePD, Error>({
    queryKey: ['creditRiskData'],
    queryFn: async () => {
      const { data } = await axiosConfigFinal.get<AveragePD>(
        API_ENDPOINTS.BI.ECL_CHARTS.GET_WEIGHT_AVERAGE_PD
      )
      return data.map((item) => ({
        ...item,
        value: item.value * 100,
      }))
    },
  })
}
