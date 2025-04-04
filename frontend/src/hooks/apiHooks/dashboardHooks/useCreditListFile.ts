import { useMutation } from '@tanstack/react-query'
import axiosConfigFinal from '@/services/axiosConfigFinal'

interface ExportResponse {
  success: boolean
}

export const useCreditListFile = () => {
  return useMutation<ExportResponse, Error>({
    mutationFn: async () => {
      const response = await axiosConfigFinal.get('/excel/contracts', {
        responseType: 'blob',
        headers: {
          Accept:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'export.xlsx')
      document.body.appendChild(link)
      link.click()

      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)

      return { success: true }
    },
  })
}
