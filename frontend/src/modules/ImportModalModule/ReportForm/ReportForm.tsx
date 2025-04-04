import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ReportDetails } from '@/modules/ImportModalModule/ImportModalModuleConfig'
import { availableDatasets } from '@/modules/ImportModalModule/ImportModalModule'

interface ReportFormProps {
  reportDetails: ReportDetails & { datasetId: string }
  onDetailsChange: (details: ReportDetails & { datasetId: string }) => void
  onSubmit: () => void
  onCancel: () => void
  availableDatasets: typeof availableDatasets
}

export const ReportForm: React.FC<ReportFormProps> = ({
  reportDetails,
  onDetailsChange,
  onSubmit,
  onCancel,
  availableDatasets,
}) => {
  const isDetailsValid =
    reportDetails.name.length > 0 && reportDetails.datasetId.length > 0

  return (
    <div className="py-4">
      <div className="mb-4">
        <Input
          placeholder="Название отчёта"
          value={reportDetails.name}
          onChange={(e) =>
            onDetailsChange({ ...reportDetails, name: e.target.value })
          }
        />
      </div>

      <div className="mb-4 flex items-center justify-between text-black-1000">
        <span className="text-black-1000">Приватный отчёт</span>
        <Switch
          checked={reportDetails.isPublic}
          onCheckedChange={(checked) => {
            onDetailsChange({ ...reportDetails, isPublic: checked })
            if (!reportDetails.isPublic)
              toast.info('Внимание! Данный отчёт будет доступен только вам.')
            else
              toast.info('Теперь отчёт опять будет доступен всем пользователям')
          }}
        />
      </div>

      <div className="mb-4 text-black-1000">
        <Textarea
          placeholder="Описание отчёта"
          className="text-black-1000"
          value={reportDetails.description}
          onChange={(e) =>
            onDetailsChange({ ...reportDetails, description: e.target.value })
          }
        />
      </div>

      <div className="mb-6 space-y-2">
        <Label htmlFor="dataset">Выберите датасет</Label>
        <Select
          value={reportDetails.datasetId}
          onValueChange={(value) =>
            onDetailsChange({ ...reportDetails, datasetId: value })
          }
        >
          <SelectTrigger id="dataset">
            <SelectValue placeholder="Выберите датасет" />
          </SelectTrigger>
          <SelectContent>
            {availableDatasets.map((dataset) => (
              <SelectItem key={dataset.id} value={dataset.id}>
                {dataset.name} ({dataset.date})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button disabled={!isDetailsValid} variant="primary" onClick={onSubmit}>
          Создать отчёт
        </Button>
      </div>
    </div>
  )
}
