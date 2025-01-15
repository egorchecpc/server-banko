import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { AveragePD } from '@/models/AveragePD'

export const useGetAveragePDData = () => {
  return useQuery<AveragePD, Error>({
    queryKey: ['creditRiskData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get('/chart4')
      return data.creditRiskData
    },
  })
}
