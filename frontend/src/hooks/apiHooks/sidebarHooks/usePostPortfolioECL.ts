import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ECLData } from '@/models/ECL'
import { calculateECLDiff } from '@/utils/calculateECLDif'
import axiosConfigFinal from '@/services/axiosConfigFinal'

interface SummaryResponse {
  success: boolean
}

export const usePostPortfolio = (date: string) => {
  const queryClient = useQueryClient()
  const previousECLData = queryClient.getQueryData([
    'ECLDataV2',
    date,
  ]) as ECLData
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    SummaryResponse,
    Error
  >({
    mutationFn: async () => {
      const { data } = await axiosConfigFinal.post(
        `/ecl/portfolio/summary?date=${date}`
      )
      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['ECLDataV2', date] })
      const newECLData = queryClient.getQueryData([
        'ECLDataV2',
        date,
      ]) as ECLData
      if (previousECLData && newECLData) {
        const diff = calculateECLDiff(previousECLData, newECLData)
        queryClient.setQueryData(['eclDiff2'], diff)
      }
      console.log(4)
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
