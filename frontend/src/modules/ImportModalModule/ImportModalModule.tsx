import React, { useState, useEffect } from 'react'
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
import { useDatasetReport } from '@/context/DatasetContext'

export const debtorTypeNames = {
  retail: 'Розничный',
  corporate: 'Корпоративный',
  interbank: 'Межбанковский',
  sovereign: 'Суверены',
}

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
  const { datasetReport } = useDatasetReport() // Получаем данные из контекста
  // Объединяем имеющиеся датасеты с датасетом из контекста, если он есть
  const [combinedDatasets, setCombinedDatasets] = useState(availableDatasets)

  // При изменении datasetReport обновляем combinedDatasets
  useEffect(() => {
    if (datasetReport) {
      // Проверяем, есть ли уже такой датасет в списке
      const exists = combinedDatasets.some((ds) => ds.id === datasetReport.id)

      if (!exists) {
        // Если датасета еще нет в списке, добавляем его в начало
        setCombinedDatasets([datasetReport, ...availableDatasets])
      }
    }
  }, [datasetReport])

  const [reportDetails, setReportDetails] = useState<
    ReportDetails & { datasetId: string }
  >({
    name: '',
    isPublic: false,
    description: '',
    type: debtorTypeNames[search.type],
    datasetId: datasetReport?.id || '', // Используем ID из контекста, если есть
  })

  // Обновляем datasetId при изменении datasetReport
  useEffect(() => {
    if (datasetReport) {
      setReportDetails((prev) => ({
        ...prev,
        datasetId: datasetReport.id,
      }))
    }
  }, [datasetReport])

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
          availableDatasets={combinedDatasets} // Используем объединенный список датасетов
        />
      </DialogContent>
    </Dialog>
  )
}

export default ImportModalModule
