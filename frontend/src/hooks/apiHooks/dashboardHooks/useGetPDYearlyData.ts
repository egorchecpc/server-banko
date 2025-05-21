import { useQuery } from '@tanstack/react-query'
import { YearlyDataResponse } from '@/models/PD'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'

const fetchPDYearlyData = async (): Promise<YearlyDataResponse> => {
  const response = await axiosConfigFinal.get<YearlyDataResponse>(
    API_ENDPOINTS.DASHBOARD.PD.GET_YEARLY_PD
  )
  const rawData = response.data

  return Object.entries(rawData).reduce((acc, [year, data]) => {
    acc[year] = { cpd: data.cpd }
    return acc
  }, {} as YearlyDataResponse)
}

export const useGetPDYearlyData = () => {
  return useQuery<YearlyDataResponse, Error>({
    queryKey: ['PDYearlyData'],
    queryFn: fetchPDYearlyData,
  })
}
