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
import {
  REPORT_TYPES,
  ReportDetails,
  ReportType,
} from '@/modules/ImportModalModule/ImportModalModuleConfig'
import { debtorTypeNames } from '@/modules/ImportModalModule/ImportModalModule'

interface ReportFormProps {
  reportDetails: ReportDetails
  onDetailsChange: (details: ReportDetails) => void
  onNext: () => void
  onCancel: () => void
}

export const ReportForm: React.FC<ReportFormProps> = ({
  reportDetails,
  onDetailsChange,
  onNext,
  onCancel,
}) => {
  const isDetailsValid = reportDetails.name.length > 0

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

      {/*<div className="mb-4">*/}
      {/*  <Select*/}
      {/*    value={reportDetails.type}*/}
      {/*    onValueChange={(value) =>*/}
      {/*      onDetailsChange({ ...reportDetails, type: value as ReportType })*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <SelectTrigger>*/}
      {/*      <SelectValue placeholder="Выберите тип отчёта" />*/}
      {/*    </SelectTrigger>*/}
      {/*    <SelectContent>*/}
      {/*      {REPORT_TYPES.map((type) => (*/}
      {/*        <SelectItem key={type.value} value={type.value}>*/}
      {/*          {type.label}*/}
      {/*        </SelectItem>*/}
      {/*      ))}*/}
      {/*    </SelectContent>*/}
      {/*  </Select>*/}
      {/*</div>*/}

      <div className="text-black-1000 mb-4 flex items-center justify-between">
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

      <div className="text-black-1000 mb-6">
        <Textarea
          placeholder="Описание отчёта"
          className="text-black-1000"
          value={reportDetails.description}
          onChange={(e) =>
            onDetailsChange({ ...reportDetails, description: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button disabled={!isDetailsValid} variant="primary" onClick={onNext}>
          Далее
        </Button>
      </div>
    </div>
  )
}
