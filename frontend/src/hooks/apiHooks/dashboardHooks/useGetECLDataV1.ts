import { useQuery } from '@tanstack/react-query'
import { ECLData } from '@/models/ECL'
import { transformECLDataFromServer } from '@/utils/formatECLFromServer'
import { ECLType } from '@/models/FormatedECL'
import axiosConfigFinal from '@/services/axiosConfigFinal'

const filterUnwantedProducts = (data: ECLData) => {
  const filteredData = { ...data }
  Object.keys(filteredData).forEach((stageKey) => {
    if (Array.isArray(filteredData[stageKey])) {
      filteredData[stageKey] = filteredData[stageKey].map((creditTypeItem) => {
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
      const { data } = await axiosConfigFinal.get(`/ecl/summary?date=${date}`)
      const filteredData = filterUnwantedProducts(data)
      return transformECLDataFromServer(filteredData, ECLType.PRODUCT)
    },

    enabled: !!date,
  })
}
