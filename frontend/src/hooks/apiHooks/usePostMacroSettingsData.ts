import { useMutation } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { API_ENDPOINTS } from '@/services/endpoints'
import { FormatedMacroSettings } from '@/models/FormatedMacroSettings'

export const usePostMacroSettingsData = () => {
  return useMutation<
      FormatedMacroSettings,
      Error,
      Partial<FormatedMacroSettings>
  >({
    mutationFn: async (newMacroSettings) => {
      const { data } = await axiosConfig.post(
          'http://banko.stacklevel.group/api/macro',
          newMacroSettings
      )
      return data
    },
  })
}
