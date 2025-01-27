import { useMutation } from '@tanstack/react-query'
import { DebtorData } from '@/models/DebtorData'
import { FormatedMacroSettings } from '@/models/FormatedMacroSettings'
import axiosConfig from '@/services/axiosConfig'
import { CreateReportPayload } from '@/utils/createReportPayload'

interface UpdateReportParams {
  id: string
  debtorData: DebtorData
  macroData: FormatedMacroSettings
}

const updateReport = async (params: UpdateReportParams) => {
  const { id, debtorData, macroData } = params

  const response = await axiosConfig.post('/update-report', {
    id,
    debtorData,
    macroData,
  })

  return response.data
}

export const useUpdateReport = () => {
  return useMutation({
    mutationFn: updateReport,
    onSuccess: (data) => {
      console.log('Отчёт успешно обновлен', data)
    },
    onError: (error: any) => {
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
      const { data } = await axiosConfig.post<CreateReportResponse>(
        '/create-report',
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
