import { useQuery } from '@tanstack/react-query'
import { ECLData } from '@/models/ECL'
import axios from 'axios'
import { transformECLDataFromServer } from '@/utils/formatECLFromServer'
import { ECLType } from '@/models/FormatedECL'

export const useGetECLDataV1 = () => {
  return useQuery<ECLData, Error>({
    queryKey: ['ECLDataV1'],
    queryFn: async () => {
      //const { data } = await axios.get('http://192.168.100.18/api/ecl/summary')
      // return transformECLDataFromServer(data, ECLType.PRODUCT)
      const { data } = await axios.get('http://localhost:3000/ecldata1')
      return data
    },
  })
}
