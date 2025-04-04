import { useQuery } from '@tanstack/react-query'
import { YearlyDataResponse } from '@/models/PD'
import axiosConfigFinal from '@/services/axiosConfigFinal'

export const useGetPDYearlyData = () => {
  return useQuery<YearlyDataResponse, Error>({
    queryKey: ['PDYearlyData'],
    queryFn: async () => {
      const response = await axiosConfigFinal.get<YearlyDataResponse>(
        '/probabilityDefault/yearly'
      )

      return Object.entries(response.data) //.filter(([year]) => !['year2021', 'year2022', 'year2023'].includes(year))
        .reduce((acc, [year, data]) => {
          acc[year] = {
            cpd: data.cpd,
          }
          return acc
        }, {} as YearlyDataResponse)
    },
  })
}
