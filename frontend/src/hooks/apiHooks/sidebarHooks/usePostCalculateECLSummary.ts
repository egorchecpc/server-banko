import { useMutation, useQueryClient } from '@tanstack/react-query'
import { calculateECLDiff } from '@/utils/calculateECLDif'
import { ECLData } from '@/models/ECL'
import axiosConfigFinal from '@/services/axiosConfigFinal'

interface SummaryResponse {
  success: boolean
}

export const usePostSummary = (date: string) => {
  const queryClient = useQueryClient()
  const queryKey: [string, string] = ['ECLDataV1', date]

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    SummaryResponse,
    Error
  >({
    mutationFn: async () => {
      const { data } = await axiosConfigFinal.post(`/ecl/summary?date=${date}`)
      return data
    },
    onSuccess: async () => {
      const previousData = queryClient.getQueryData<ECLData>(queryKey)
      await queryClient.invalidateQueries({ queryKey })

      const newData = queryClient.getQueryData<ECLData>(queryKey)

      if (!previousData || !newData) return

      const diff = calculateECLDiff(previousData, newData, true)
      queryClient.setQueryData(['eclDiff1'], diff)
    },
  })

  return { mutate, isPending, isSuccess, isError, error }
}
