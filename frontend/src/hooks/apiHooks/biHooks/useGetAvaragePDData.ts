import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { AveragePD } from '@/models/AveragePD'
import axios from 'axios'

export const useGetAveragePDData = () => {
  return useQuery<AveragePD, Error>({
    queryKey: ['creditRiskData'],
    queryFn: async () => {
      const { data } = await axios.get<AveragePD>(
        'https://banko-r-backend.stacklevel.group/api/ecl/weightedAveragePD'
      )
      return data.map((item) => ({
        ...item,
        value: item.value * 100,
      }))
    },
  })
}
