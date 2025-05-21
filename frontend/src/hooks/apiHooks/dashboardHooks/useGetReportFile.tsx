import { useMutation } from '@tanstack/react-query'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { downloadBlob } from '@/utils/downloadBlob'
import { API_ENDPOINTS } from '@/services/endpoints'

const EXPORT_HEADERS = {
  Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

interface ExportOptions {
  filename?: string
}

interface ExportResponse {
  success: boolean
}

export const useExportFile = (options?: ExportOptions) => {
  return useMutation<ExportResponse, Error>({
    mutationFn: async () => {
      const response = await axiosConfigFinal.get(
        API_ENDPOINTS.DASHBOARD.REPORTS.GET_REPORTS_FILE,
        {
          responseType: 'blob',
          headers: EXPORT_HEADERS,
        }
      )

      downloadBlob(response.data, options?.filename || 'export.xlsx')

      return { success: true }
    },
  })
}
