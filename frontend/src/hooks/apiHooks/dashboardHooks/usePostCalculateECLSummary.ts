import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { calculateECLDiff } from '@/utils/calculateECLDif'
import { ECLData } from '@/models/ECL'

interface SummaryResponse {
  success: boolean
}

export const usePostSummary = (date: string) => {
  const queryClient = useQueryClient()
  const previousECLData = queryClient.getQueryData([
    'ECLDataV1',
    date,
  ]) as ECLData
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    SummaryResponse,
    Error
  >({
    mutationFn: async () => {
      const { data } = await axiosConfig.post(
        `https://banko-r-backend.stacklevel.group/api/ecl/summary?date=${date}`
      )
      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['ECLDataV1', date] })
      const newECLData = queryClient.getQueryData([
        'ECLDataV1',
        date,
      ]) as ECLData
      if (previousECLData && newECLData) {
        const diff = calculateECLDiff(previousECLData, newECLData, true)
        queryClient.setQueryData(['eclDiff1'], diff)
      }
    },
  })

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
