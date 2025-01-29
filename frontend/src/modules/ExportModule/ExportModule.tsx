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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Download as DownloadIcon } from 'lucide-react'
import { useReport } from '@/context/DateContext'

interface ExportSettings {
  forecastYears: number
  pdDisplayType: 'yearly' | 'quarterly'
  pdDetailType: 'quarterly' | 'monthly'
  lgdPeriod: string
}

export const ExportComponent: React.FC = () => {
  const { selectedData } = useReport()
  const [settings, setSettings] = React.useState<ExportSettings>({
    forecastYears: 1,
    pdDisplayType: 'yearly',
    pdDetailType: 'quarterly',
    lgdPeriod: '',
  })

  const handleExport = () => {
    // Теперь используем selectedDate из контекста вместо settings.reportingPeriod
    console.log('Export settings:', {
      ...settings,
      reportingPeriod: selectedData.date,
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
                {/* Reporting Period - теперь статичное поле */}
                <div className="grid gap-2">
                  <Label>Отчетный период</Label>
                  <div className="bg-muted rounded-md border p-2">
                    {selectedData.date}
                  </div>
                </div>

                {/* Остальные поля остаются без изменений */}
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
                  <RadioGroup
                    defaultValue="yearly"
                    onValueChange={(value: 'yearly' | 'quarterly') =>
                      setSettings({ ...settings, pdDisplayType: value })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yearly" id="yearly" />
                      <Label htmlFor="yearly">По году</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quarterly" id="quarterly" />
                      <Label htmlFor="quarterly">По кварталу</Label>
                    </div>
                  </RadioGroup>
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
