import { useMutation } from '@tanstack/react-query'
import { FormatedMacroSettings } from '@/models/FormatedMacroSettings'
import axios from "axios"

export const usePostMacroSettingsData = () => {
  return useMutation<
    FormatedMacroSettings,
    Error,
    Partial<FormatedMacroSettings>
  >({
    mutationFn: async (newMacroSettings) => {
      const { data } = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://banko-r-backend.stacklevel.group/api/macro",
        newMacroSettings
      )

      return data
    },
  })
}
