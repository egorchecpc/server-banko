import { useQuery } from '@tanstack/react-query'
import { ECLData } from '@/models/ECL'
import { transformECLDataFromServer } from '@/utils/formatECLFromServer'
import axios from 'axios'
import { ECLType } from '@/models/FormatedECL'

export const useGetECLDataV2 = () => {
  return useQuery<ECLData, Error>({
    queryKey: ['ECLDataV2'],
    queryFn: async () => {
      const { data } = await axios.get(
        'http://192.168.100.18/api/ecl/portfolio/summary'
      )
      return transformECLDataFromServer(data, ECLType.DELAY)
    },
  })
}
