import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormatedMacroSettings } from '@/models/FormatedMacroSettings'
import axiosConfigFinal from '@/services/axiosConfigFinal'

const MACRO_VERSION_KEY = ['currentMacroVersion']
const INVALIDATE_KEYS = [
  ['PDForecastData'],
  ['PDQuarterlyData'],
  ['PDYearlyData'],
]

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
        },
      })

      queryClient.setQueryData(
        MACRO_VERSION_KEY,
        data.version || Date.now().toString()
      )

      return data
    },
    onSuccess: () => {
      INVALIDATE_KEYS.forEach((key) => {
        queryClient
          .invalidateQueries({ queryKey: key })
          .then((r) => console.log(r, 'updated'))
      })
    },
  })
}
