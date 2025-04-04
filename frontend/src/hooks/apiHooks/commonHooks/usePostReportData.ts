import { useMutation } from '@tanstack/react-query'
import { DebtorData } from '@/models/DebtorData'
import { FormatedMacroSettings } from '@/models/FormatedMacroSettings'
import axiosConfigMock from '@/services/axiosConfigMock'
import { AxiosError } from 'axios'
import { CreateReportPayload } from '@/utils/createReportPayload'
import { API_ENDPOINTS } from '@/services/endpoints'

interface UpdateReportParams {
  id: string
  debtorData: DebtorData
  macroData: FormatedMacroSettings
}

const updateReport = async (params: UpdateReportParams) => {
  const { id, debtorData, macroData } = params

  const response = await axiosConfigMock.post(
    API_ENDPOINTS.COMMON.REPORTS.UPDATE_REPORTS,
    {
      id,
      debtorData,
      macroData,
    }
  )

  return response.data
}

export const useUpdateReport = () => {
  return useMutation({
    mutationFn: updateReport,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error: AxiosError) => {
      console.error('Ошибка при обновлении отчёта', error)
    },
  })
}

interface CreateReportResponse {
  message: string
  data: CreateReportPayload
}

export const useCreateReport = () => {
  return useMutation({
    mutationFn: async (payload: CreateReportPayload) => {
      const { data } = await axiosConfigMock.post<CreateReportResponse>(
        API_ENDPOINTS.COMMON.REPORTS.CREATE_REPORTS,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return data
    },
  })
}
