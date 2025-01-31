import { type FC, useEffect, useRef, useState } from 'react'
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
import type { MacroSettings } from '@/models/MacroSettings'
import { useTemplates } from '@/hooks/apiHooks/commonHooks/useTemplate'
import { formatNumber } from '@/utils/formatNumber'
import { ScrollArea } from '@/components/ui/scroll-area'

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

const scenarioLabels = {
  worst: 'Худший',
  norm: 'Базовый',
  best: 'Лучший',
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
  const getYears = (indicator: MacroSettings) => {
    return Object.keys(indicator.values).sort()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogContent
          className="sm:max-w-[600px]"
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
              <ScrollArea className="mt-4 h-[400px]">
                <div className="space-y-4">
                  {selectedTemplateData.indicators.map((indicator) => {
                    const years = getYears(indicator)
                    return (
                      <div
                        key={indicator.id}
                        className="rounded-lg bg-white p-4 shadow-sm"
                      >
                        <h3 className="mb-2 text-sm font-bold leading-5 text-black-800">
                          {indicatorNames[indicator.type]}
                        </h3>
                        <div className="grid grid-cols-4 gap-1">
                          <div className="col-span-1"></div>
                          {['worst', 'norm', 'best'].map((scenario, index) => (
                            <div
                              key={`${scenario}-${index}`}
                              className="text-center text-ssm font-normal leading-14 text-grey-900"
                            >
                              {
                                scenarioLabels[
                                  scenario as keyof typeof scenarioLabels
                                ]
                              }
                            </div>
                          ))}
                          {years.map((year) => (
                            <>
                              <div className="mt-4 text-sm font-bold leading-4 text-grey-900">
                                {year} 01.01
                              </div>
                              {['worst', 'norm', 'best'].map(
                                (scenario, index) => (
                                  <div
                                    key={`${year}-${scenario}-${index}`}
                                    className={`rounded-lg py-3 text-center ${
                                      scenario === 'worst'
                                        ? 'bg-lite-orange/5'
                                        : scenario === 'best'
                                          ? 'bg-lite-green'
                                          : 'bg-white'
                                    }`}
                                  >
                                    <div className="text-sm font-normal leading-15 text-black-800">
                                      {formatNumber(
                                        indicator.values[year][scenario].value
                                      )}
                                    </div>
                                    <div className="text-sm font-normal leading-15 text-black-800">
                                      (
                                      {
                                        indicator.values[year][scenario]
                                          .probability
                                      }
                                      %)
                                    </div>
                                  </div>
                                )
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
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
