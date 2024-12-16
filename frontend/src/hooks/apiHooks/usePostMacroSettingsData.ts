import { useMutation } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { API_ENDPOINTS } from '@/services/endpoints'
import { MacroSettings } from '@/models/MacroSettings'

export const usePostMacroSettingsData = () => {
  return useMutation<MacroSettings, Error, Partial<MacroSettings>>({
    mutationFn: async (newMacroSettings) => {
      const { data } = await axiosConfig.post(
        API_ENDPOINTS.POST_MACRO_SETTINGS_DATA,
        newMacroSettings
      )
      return data
    },
  })
}
