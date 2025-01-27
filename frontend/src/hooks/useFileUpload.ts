import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { FilesState } from '@/modules/ImportModalModule/ImportModalModuleConfig'

export const useFileUpload = () => {
  const { t } = useTranslation()
  const [files, setFiles] = useState<FilesState>({
    portfolio: { progress: 0, status: null, file: null },
    payments: { progress: 0, status: null, file: null },
    cashflow: { progress: 0, status: null, file: null },
    macro: { progress: 0, status: null, file: null },
  })

  const handleFileChange = async (
    type: keyof FilesState,
    file: File | null
  ): Promise<void> => {
    if (!file) return

    setFiles((prev) => ({
      ...prev,
      [type]: { ...prev[type], file, progress: 0, status: 'uploading' },
    }))

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setFiles((prev) => ({
        ...prev,
        [type]: { ...prev[type], progress: i },
      }))
    }

    try {
      const success = Math.random() > 0.1
      if (!success) throw new Error(t('reports.validation.error'))

      setFiles((prev) => ({
        ...prev,
        [type]: { ...prev[type], status: 'success' },
      }))
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
      setFiles((prev) => ({
        ...prev,
        [type]: { ...prev[type], status: 'error' },
      }))
    }
  }

  const isAllFilesUploaded = Object.values(files).every(
    (file) => file.status === 'success'
  )

  return { files, handleFileChange, isAllFilesUploaded }
}
