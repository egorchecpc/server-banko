import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { PDItem } from '@/models/PD'

export const useGetPDYearlyData = () => {
  return useQuery<{ cPDYears: PDItem[]; mPDYears: PDItem[] }, Error>({
    queryKey: ['PDYearlyData'],
    queryFn: async () => {
      const [cPDYears, mPDYears] = await Promise.all([
        axiosConfig.get('/cpdyears'),
        axiosConfig.get('/mpdyears'),
      ])

      return {
        cPDYears: cPDYears.data.map((item: PDItem) => ({
          ...item,
          type: 'cPD',
        })),
        mPDYears: mPDYears.data.map((item: PDItem) => ({
          ...item,
          type: 'mPD',
        })),
      }
    },
  })
}
