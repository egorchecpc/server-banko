import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'

interface SummaryResponse {
  success: boolean
}

export const usePostSummary = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    SummaryResponse,
    Error
  >({
    mutationFn: async () => {
      const { data } = await axiosConfig.post(
        'https://banko-r-backend.stacklevel.group/api/ecl/summary?date=2023-12-31'
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ECLDataV1'] })
      queryClient.invalidateQueries({ queryKey: ['ECLDataV2'] })
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
