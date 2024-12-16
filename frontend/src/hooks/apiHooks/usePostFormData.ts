import { useMutation } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { API_ENDPOINTS } from '@/services/endpoints'
import { FormData } from '@/models/FormData'

export const usePostFormData = () => {
  return useMutation<FormData, Error, Partial<FormData>>({
    mutationFn: async (newFormData) => {
      const { data } = await axiosConfig.post(
        API_ENDPOINTS.POST_FORM_DATA,
        newFormData
      )
      return data
    },
  })
}
