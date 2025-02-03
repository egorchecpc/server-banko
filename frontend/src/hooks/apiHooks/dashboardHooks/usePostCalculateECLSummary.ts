import { useMutation } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'

interface SummaryResponse {
  success: boolean
}

export const usePostSummary = () => {
  return useMutation<SummaryResponse, Error>({
    mutationFn: async () => {
      const { data } = await axiosConfig.post(
        'http://192.168.100.18/api/ecl/summary?date=2023-12-31'
      )
      return data
    },
  })
}
