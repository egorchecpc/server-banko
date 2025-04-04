import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearch } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useCreateReport } from '@/hooks/apiHooks/commonHooks/usePostReportData'
import { createReportPayload } from '@/utils/createReportPayload'
import {
  ReportDetails,
  ReportModalProps,
} from '@/modules/ImportModalModule/ImportModalModuleConfig'
import { ReportForm } from '@/modules/ImportModalModule/ReportForm/ReportForm'

export const debtorTypeNames = {
  retail: 'Розничный',
  corporate: 'Корпоративный',
  interbank: 'Межбанковский',
  sovereign: 'Суверены',
}

// Примеры датасетов
export const availableDatasets = [
  {
    id: 'ds-2025-04-03-981465',
    name: 'Кредитный портфель Q1 2025',
    date: '03.04.2025',
  },
  {
    id: 'ds-2025-03-15-754321',
    name: 'Корпоративный портфель март 2025',
    date: '15.03.2025',
  },
  {
    id: 'ds-2025-02-20-632541',
    name: 'Финансовый отчет Q4 2024',
    date: '20.02.2025',
  },
  {
    id: 'ds-2025-01-10-123456',
    name: 'Розничный портфель январь 2025',
    date: '10.01.2025',
  },
]

const ImportModalModule: React.FC<ReportModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const search: { type: string } = useSearch({
    strict: false,
  })
  const createReportMutation = useCreateReport()
  const [reportDetails, setReportDetails] = useState<
    ReportDetails & { datasetId: string }
  >({
    name: '',
    isPublic: false,
    description: '',
    type: debtorTypeNames[search.type],
    datasetId: '',
  })

  const handleSubmit = async () => {
    const payload = createReportPayload({
      name: reportDetails.name,
      type: debtorTypeNames[search.type],
      isPublic: reportDetails.isPublic,
      description: reportDetails.description,
    })
    createReportMutation.mutate(payload, {
      onSuccess: (data) => {
        toast.success(t('reports.creation.success'))
        console.log(payload)
        navigate({
          to: `${data.data.id}/new-report`,
          search: { type: search.type },
        })
        // navigate({
        //   to: `${data.data.id}/credit-type`,
        //   search: { id: payload.id, type: 'new' },
        // })
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
          <DialogTitle>Детали отчёта</DialogTitle>
        </DialogHeader>

        <ReportForm
          reportDetails={reportDetails}
          onDetailsChange={setReportDetails}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          availableDatasets={availableDatasets}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ImportModalModule
