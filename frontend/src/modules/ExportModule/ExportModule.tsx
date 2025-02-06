import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Download as DownloadIcon } from 'lucide-react'
import { useExportFile } from '@/hooks/apiHooks/dashboardHooks/useGetReportFile'
import { toast } from 'sonner'
import { useReportId } from '@/context/ReportIdContext'
import { useReportDataWithValidation } from '@/hooks/apiHooks/commonHooks/useReportData'

interface ExportSettings {
  forecastYears: number
  pdDisplayTypes: {
    yearly: boolean
    quarterly: boolean
  }
  pdDetailType: 'quarterly' | 'monthly'
  lgdPeriod: string
}

export const ExportComponent: React.FC = () => {
  const { reportId } = useReportId()
  const { report } = useReportDataWithValidation(reportId || '')
  const basicReportDate = new Date(report?.debtorData.date || '01.01.2024')
  const reportDate =
    basicReportDate.toLocaleDateString('ru-RU') || 'Дата не найдена'
  const [settings, setSettings] = React.useState<ExportSettings>({
    forecastYears: 1,
    pdDisplayTypes: {
      yearly: false,
      quarterly: false,
    },
    pdDetailType: 'quarterly',
    lgdPeriod: '',
  })
  const exportMutation = useExportFile()
  const handleExport = async () => {
    try {
      await exportMutation.mutateAsync()

      toast.success('Файл успешно экспортирован')
    } catch (error) {
      toast.error('Не удалось экспортировать файл' + error)
    }
  }
  const handleCheckboxChange = (value: 'yearly' | 'quarterly') => {
    setSettings({
      ...settings,
      pdDisplayTypes: {
        ...settings.pdDisplayTypes,
        [value]: !settings.pdDisplayTypes[value],
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="export" size="default" className="mb-3">
          <div className="flex items-center gap-1">
            <DownloadIcon className="h-4 w-4" />
            <div>Экспортировать</div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Настройки экспорта</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <div className="pt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Отчетный период</Label>
                  <div className="bg-muted rounded-md border p-2">
                    {reportDate}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="forecastYears">
                    Количество лет для прогноза PD
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        forecastYears: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger id="forecastYears">
                      <SelectValue placeholder="Выберите количество лет" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}{' '}
                          {year === 1 ? 'год' : year < 5 ? 'года' : 'лет'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Кумулятивный PD (cPD)</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="yearly"
                        checked={settings.pdDisplayTypes.yearly}
                        onCheckedChange={() => handleCheckboxChange('yearly')}
                      />
                      <Label htmlFor="yearly">По году</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="quarterly"
                        checked={settings.pdDisplayTypes.quarterly}
                        onCheckedChange={() =>
                          handleCheckboxChange('quarterly')
                        }
                      />
                      <Label htmlFor="quarterly">По кварталу</Label>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lgdPeriod">Период отображения LGD</Label>
                  <Select
                    onValueChange={(value) =>
                      setSettings({ ...settings, lgdPeriod: value })
                    }
                  >
                    <SelectTrigger id="lgdPeriod">
                      <SelectValue placeholder="Выберите период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1 год</SelectItem>
                      <SelectItem value="2years">2 года</SelectItem>
                      <SelectItem value="3years">3 года</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <Button variant="primary" onClick={handleExport} className="mt-4">
            Экспортировать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
