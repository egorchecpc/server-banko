import { useMutation } from '@tanstack/react-query'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'
import { downloadBlob } from '@/utils/downloadBlob'

interface ExportResponse {
  success: boolean
}

export const useCreditListFile = () => {
  return useMutation<ExportResponse, Error>({
    mutationFn: async () => {
      const response = await axiosConfigFinal.get(
        API_ENDPOINTS.DASHBOARD.CONTRACTS.GET_CONTRACTS_FILE,
        {
          responseType: 'blob',
          headers: {
            Accept:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        }
      )

      downloadBlob(response.data, 'export.xlsx')

      return { success: true }
    },
  })
}
