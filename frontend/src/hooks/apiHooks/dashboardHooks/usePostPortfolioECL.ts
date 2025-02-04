import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { ECLData } from '@/models/ECL'
import { calculateECLDiff } from '@/utils/calculateECLDif'

interface SummaryResponse {
  success: boolean
}

export const usePostPortfolio = () => {
  const queryClient = useQueryClient()
  const previousECLData = queryClient.getQueryData(['ECLDataV2']) as ECLData
  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    SummaryResponse,
    Error
  >({
    mutationFn: async () => {
      const { data } = await axiosConfig.post(
        'https://banko-r-backend.stacklevel.group/api/ecl/portfolio/summary?date=2023-12-31'
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

  // Возвращаем все необходимые данные
  return {
    mutate,
    isPending, // Состояние загрузки
    isSuccess, // Успешное завершение мутации
    isError, // Ошибка при мутации
    error, // Текст ошибки (если есть)
  }
}
