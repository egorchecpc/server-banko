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
        'https://banko-r-backend.stacklevel.group/api/ecl/portfolio/summary'
      )
      return transformECLDataFromServer(data, ECLType.DELAY)
      //const { data } = await axios.get('http://localhost:3000/ecldata2')
      //return data
    },
  })
}
