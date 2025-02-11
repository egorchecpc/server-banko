import { useQuery } from '@tanstack/react-query'
import { GBVData } from '@/models/GBV'
import axios from 'axios'

export const useGetGBVData = (date: string) => {
  return useQuery<GBVData[], Error>({
    queryKey: ['GBVData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://banko-r-backend.stacklevel.group/api/ecl/grossCarryingAmount/sum?date=${date}`
      )
      return data
    },
  })
}
