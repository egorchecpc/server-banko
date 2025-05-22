import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ECLData } from '@/models/ECL'
import { calculateECLDiff } from '@/utils/calculateECLDif'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'

interface SummaryResponse {
  success: boolean
}

export const usePostPortfolio = (date: string) => {
  const queryClient = useQueryClient()
  const eclQueryKey = ['ECLDataV2', date]
  const previousECLData = queryClient.getQueryData(eclQueryKey) as
    | ECLData[]
    | undefined

  const {
    mutate: postPortfolio,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<SummaryResponse, Error>({
    mutationFn: async (): Promise<SummaryResponse> => {
      const { data } = await axiosConfigFinal.post(
        API_ENDPOINTS.SIDEBAR.ECL.GET_ECL_PORTFOLIO_SUMMARY(date)
      )
      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: eclQueryKey })
      const newECLData = queryClient.getQueryData(eclQueryKey) as
        | ECLData[]
        | undefined

      if (previousECLData && newECLData) {
        const diff = calculateECLDiff(previousECLData, newECLData)
        queryClient.setQueryData(['eclDiff2'], diff)
      }
    },
  })

  return {
    postPortfolio,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
