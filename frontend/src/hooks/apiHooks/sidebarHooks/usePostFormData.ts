import { useMutation } from '@tanstack/react-query'
import axiosConfigMock from '@/services/axiosConfigMock'
import { API_ENDPOINTS } from '@/services/endpoints'
import { DebtorData } from '@/models/DebtorData'

export const usePostFormData = () => {
  return useMutation<DebtorData, Error, Partial<DebtorData>>({
    mutationFn: async (newFormData) => {
      const { data } = await axiosConfigMock.post(
        API_ENDPOINTS.POST_FORM_DATA,
        newFormData
      )
      return data
    },
  })
}
