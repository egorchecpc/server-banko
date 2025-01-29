import { FC, useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MacroSettings } from '@/models/MacroSettings'
import { useTemplates } from '@/hooks/apiHooks/commonHooks/useTemplate'

interface MacroTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onTemplateSelect: (indicators: MacroSettings[]) => void
}

export const indicatorNames: { [key: string]: string } = {
  productProfitability: 'Рентабельность продукции',
  realWage: 'Реальная заработная плата',
  gdp: 'ВВП',
  realDisposablePopulationIncome: 'Реально располагаемые доходы населения',
  averageMonthlySalary: 'Средняя месячная зарплата',
}

export const MacroTemplateModal: FC<MacroTemplateModalProps> = ({
  isOpen,
  onClose,
  onTemplateSelect,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const initialFocusRef = useRef<HTMLButtonElement>(null)
  const { templates = [] } = useTemplates()

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  useEffect(() => {
    if (!isOpen) {
      setSelectedTemplate('')
    }
  }, [isOpen])

  const handleSubmit = () => {
    const template = templates.find((t) => t.id === selectedTemplate)
    if (template) {
      onTemplateSelect(template.indicators)
    }
  }

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate)

  const getLatestYearValues = (indicator: MacroSettings) => {
    const years = Object.keys(indicator.values)
    const latestYear = years[years.length - 1]
    return indicator.values[latestYear]
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogContent
          className="sm:max-w-[25rem]"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            initialFocusRef.current?.focus()
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle>Выбор шаблона</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Select
              value={selectedTemplate}
              onValueChange={handleTemplateSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите шаблон" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedTemplateData && (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">
                  Макропоказатели в шаблоне (значения с 2024 по 2027 год):
                </h4>
                <div className="space-y-3">
                  {selectedTemplateData.indicators.map((indicator) => {
                    const latestValues = getLatestYearValues(indicator)
                    return (
                      <div key={indicator.id} className="text-sm">
                        <div className="font-medium">
                          {indicatorNames[indicator.type]}:
                        </div>
                        <div className="ml-4 text-gray-600">
                          <div>
                            Худший: {latestValues.worst.value} (вер.{' '}
                            {latestValues.worst.probability}%)
                          </div>
                          <div>
                            Базовый: {latestValues.norm.value} (вер.{' '}
                            {latestValues.norm.probability}%)
                          </div>
                          <div>
                            Лучший: {latestValues.best.value} (вер.{' '}
                            {latestValues.best.probability}%)
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button
                variant={'primary'}
                onClick={handleSubmit}
                disabled={!selectedTemplate}
              >
                Готово
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
