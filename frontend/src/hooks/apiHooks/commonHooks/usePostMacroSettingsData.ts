import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormatedMacroSettings } from '@/models/FormatedMacroSettings'
import axios from 'axios'
import axiosConfig from '@/services/axiosConfig'

export const usePostMacroSettingsData = () => {
  const queryClient = useQueryClient()

  return useMutation<
    FormatedMacroSettings,
    Error,
    Partial<FormatedMacroSettings>
  >({
    mutationFn: async (newMacroSettings) => {
      const { data } = await axios.post(
        'https://banko-r-backend.stacklevel.group/api/macro',
        newMacroSettings,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
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
