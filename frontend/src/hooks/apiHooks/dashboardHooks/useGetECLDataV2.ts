import { useQuery } from '@tanstack/react-query'
import { ECLData } from '@/models/ECL'
import { transformECLDataFromServer } from '@/utils/formatECLFromServer'
import axios from 'axios'
import { ECLType } from '@/models/FormatedECL'

export const useGetECLDataV2 = (date: string) => {
  return useQuery<ECLData, Error>({
    queryKey: ['ECLDataV2', date],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://banko-r-backend.stacklevel.group/api/ecl/portfolio/summary?date=${date}`
      )
      return transformECLDataFromServer(data, ECLType.DELAY)
      //const { data } = await axios.get('http://localhost:3000/ecldata2')
      //return data
    },
  })
}
