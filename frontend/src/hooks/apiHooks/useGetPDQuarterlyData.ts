import { useQuery } from '@tanstack/react-query'
import { PDItem } from '@/models/PD'
import axiosConfig from '@/services/axiosConfig'

export const useGetPDQuarterlyData = () => {
  return useQuery<{ cPDQData: PDItem[]; mPDQData: PDItem[] }, Error>({
    queryKey: ['PDQuarterlyData'],
    queryFn: async () => {
      const [cPDQData, mPDQData] = await Promise.all([
        axiosConfig.get('/cpdqdata'),
        axiosConfig.get('/mpdqdata'),
      ])

      return {
        cPDQData: cPDQData.data.map((item: PDItem) => ({
          ...item,
          type: 'cPD',
        })),
        mPDQData: mPDQData.data.map((item: PDItem) => ({
          ...item,
          type: 'mPD',
        })),
      }
    },
  })
}
