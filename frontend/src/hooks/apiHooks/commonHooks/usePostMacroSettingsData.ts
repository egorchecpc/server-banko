import { useMutation } from '@tanstack/react-query'
import { FormatedMacroSettings } from '@/models/FormatedMacroSettings'
import axios from 'axios'
import axiosConfig from '@/services/axiosConfig'

export const usePostMacroSettingsData = () => {
  return useMutation<
    FormatedMacroSettings,
    Error,
    Partial<FormatedMacroSettings>
  >({
    mutationFn: async (newMacroSettings) => {
      const { data } = await axios.post(
        'http://192.168.100.18/api/macro',
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
  })
}
