import { useQuery } from '@tanstack/react-query'
import { ECLData } from '@/models/ECL'
import axios from 'axios'
import { transformECLDataFromServer } from '@/utils/formatECLFromServer'
import { ECLType } from '@/models/FormatedECL'

const filterUnwantedProducts = (data: ECLData) => {
  const filteredData = { ...data }
  Object.keys(filteredData).forEach((stageKey) => {
    if (Array.isArray(filteredData[stageKey])) {
      filteredData[stageKey] = filteredData[stageKey].map((creditTypeItem) => {
        if (creditTypeItem.products && Array.isArray(creditTypeItem.products)) {
          creditTypeItem.products = creditTypeItem.products.filter(
            (product) =>
              product.product !== 'Ипотека 10 лет' &&
              product.product !== 'На самое важное'
          )
        }
        return creditTypeItem
      })
    }
  })

  return filteredData
}

export const useGetECLDataV1 = (date: string) => {
  return useQuery<ECLData, Error>({
    queryKey: ['ECLDataV1', date],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://banko-r-backend.stacklevel.group/api/ecl/summary?date=${date}`
      )
      const filteredData = filterUnwantedProducts(data)
      return transformECLDataFromServer(filteredData, ECLType.PRODUCT)
      //const { data } = await axios.get('http://localhost:3000/ecldata1')
      //return data
    },

    enabled: !!date,
  })
}
