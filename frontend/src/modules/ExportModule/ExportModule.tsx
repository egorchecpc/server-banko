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

interface ExportSettings {
  reportingPeriod: string
  forecastYears: number
  pdDisplayType: 'yearly' | 'quarterly'
  pdDetailType: 'quarterly' | 'monthly'
  lgdPeriod: string
}

export const ExportComponent: React.FC = () => {
  const [settings, setSettings] = React.useState<ExportSettings>({
    reportingPeriod: '',
    forecastYears: 1,
    pdDisplayType: 'yearly',
    pdDetailType: 'quarterly',
    lgdPeriod: '',
  })

  const handleExport = () => {
    console.log('Export settings:', settings)
    // Implement your export logic here
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" className="flex items-center gap-2">
          Экспортировать
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
                {/* Reporting Period */}
                <div className="grid gap-2">
                  <Label htmlFor="reportingPeriod">Отчетный период</Label>
                  <Select
                    onValueChange={(value) =>
                      setSettings({ ...settings, reportingPeriod: value })
                    }
                  >
                    <SelectTrigger id="reportingPeriod">
                      <SelectValue placeholder="Выберите период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024q1">2024 квартал I</SelectItem>
                      <SelectItem value="2024q2">2024 квартал II</SelectItem>
                      <SelectItem value="2024q3">2024 квартал III</SelectItem>
                      <SelectItem value="2024q4">2024 квартал IV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Forecast Years */}
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

                {/* Cumulative PD Display */}
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

                {/* PD Detail Display */}
                <div className="grid gap-2">
                  <Label>Показать PD</Label>
                  <RadioGroup
                    defaultValue="quarterly"
                    onValueChange={(value: 'quarterly' | 'monthly') =>
                      setSettings({ ...settings, pdDetailType: value })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quarterly" id="pd-quarterly" />
                      <Label htmlFor="pd-quarterly">По квартально</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="pd-monthly" />
                      <Label htmlFor="pd-monthly">По месячно</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* LGD Period */}
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
