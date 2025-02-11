import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { ECLData } from '@/models/ECL'
import { calculateECLDiff } from '@/utils/calculateECLDif'

interface SummaryResponse {
  success: boolean
}

export const usePostPortfolio = (date: string) => {
  const queryClient = useQueryClient()
  const previousECLData = queryClient.getQueryData(['ECLDataV2']) as ECLData
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    SummaryResponse,
    Error
  >({
    mutationFn: async () => {
      const { data } = await axiosConfig.post(
        `https://banko-r-backend.stacklevel.group/api/ecl/portfolio/summary?date=${date}`
      )
      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['ECLDataV2'] })
      const newECLData = queryClient.getQueryData(['ECLDataV2']) as ECLData
      if (previousECLData && newECLData) {
        const diff = calculateECLDiff(previousECLData, newECLData)
        queryClient.setQueryData(['eclDiff2'], diff)
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
