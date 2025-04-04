import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormatedMacroSettings } from '@/models/FormatedMacroSettings'
import axiosConfigFinal from '@/services/axiosConfigFinal'

export const usePostMacroSettingsData = () => {
  const queryClient = useQueryClient()

  return useMutation<
    FormatedMacroSettings,
    Error,
    Partial<FormatedMacroSettings>
  >({
    mutationFn: async (newMacroSettings) => {
      const { data } = await axiosConfigFinal.post('/macro', newMacroSettings, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      queryClient.setQueryData(
        ['currentMacroVersion'],
        data.version || Date.now().toString()
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['PDForecastData'] })
      queryClient.invalidateQueries({ queryKey: ['PDQuarterlyData'] })
      queryClient.invalidateQueries({ queryKey: ['PDYearlyData'] })
    },
  })
}
