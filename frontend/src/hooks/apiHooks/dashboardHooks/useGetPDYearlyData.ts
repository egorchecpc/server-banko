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
        .filter(
          ([year]) => !['year2021', 'year2022', 'year2023'].includes(year)
        )
        .reduce((acc, [year, data]) => {
          acc[year] = {
            cpd: data.cpd,
          }
          return acc
        }, {} as YearlyDataResponse)
    },
  })
}
