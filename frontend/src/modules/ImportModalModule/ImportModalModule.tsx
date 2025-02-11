import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useCreateReport } from '@/hooks/apiHooks/commonHooks/usePostReportData'
import { createReportPayload } from '@/utils/createReportPayload'
import {
  FILE_UPLOAD_CONFIG,
  FilesState,
  ReportDetails,
  ReportModalProps,
} from '@/modules/ImportModalModule/ImportModalModuleConfig'
import { useFileUpload } from '@/hooks/useFileUpload'
import { ReportForm } from '@/modules/ImportModalModule/ReportForm/ReportForm'
import { FileUploadButton } from '@/modules/ImportModalModule/FileUploadBtn/FileUploadBtn'
import { useReport } from '@/context/DateContext'

const ImportModalModule: React.FC<ReportModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const createReportMutation = useCreateReport()
  const { files, handleFileChange, isAllFilesUploaded } = useFileUpload()
  const [step, setStep] = useState<1 | 2>(1)
  const [reportDetails, setReportDetails] = useState<ReportDetails>({
    name: '',
    isPublic: false,
    description: '',
    type: '',
  })

  const handleSubmit = async () => {
    const payload = createReportPayload({
      name: reportDetails.name,
      type: reportDetails.type,
      isPublic: reportDetails.isPublic,
      description: reportDetails.description,
    })
    createReportMutation.mutate(payload, {
      onSuccess: (data) => {
        toast.success(t('reports.creation.success'))
        navigate({ to: `${data.data.id}/new-report` })
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : 'Failed to create report'
        )
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? 'Детали отчёта' : 'Загрузка файлов'}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <ReportForm
            reportDetails={reportDetails}
            onDetailsChange={setReportDetails}
            onNext={() => setStep(2)}
            onCancel={() => onOpenChange(false)}
          />
        ) : (
          <div className="py-4">
            {Object.entries(FILE_UPLOAD_CONFIG).map(([type, config]) => (
              <FileUploadButton
                key={type}
                type={type as keyof FilesState}
                label={config.label}
                files={files}
                onFileChange={handleFileChange}
              />
            ))}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Назад
              </Button>
              <Button
                disabled={!isAllFilesUploaded}
                variant="primary"
                onClick={handleSubmit}
              >
                Создать отчёт
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ImportModalModule
