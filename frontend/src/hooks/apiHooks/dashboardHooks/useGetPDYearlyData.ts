import { useQuery } from '@tanstack/react-query'
import { YearlyDataResponse } from '@/models/PD'
import axios from 'axios'

export const useGetPDYearlyData = () => {
  return useQuery<YearlyDataResponse, Error>({
    queryKey: ['PDYearlyData'],
    queryFn: async () => {
      const response = await axios.get<YearlyDataResponse>(
        'https://banko-r-backend.stacklevel.group/api/probabilityDefault/yearly'
      )

      return Object.entries(response.data)
        .reduce((acc, [year, data]) => {
          acc[year] = {
            cpd: data.cpd,
          }
          return acc
        }, {} as YearlyDataResponse)
    },
  })
}
