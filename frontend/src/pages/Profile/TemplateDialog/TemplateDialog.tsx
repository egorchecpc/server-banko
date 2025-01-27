import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'
import { MacroTemplate } from '@/models/MacroTemplate'
import {
  DEFAULT_INDICATOR,
  INDICATOR_TYPES,
  indicatorNames,
  scenarioNames,
  SCENARIOS,
  YEARS,
} from '@/pages/Profile/TemplateDialog/TemplateDialogConfig'
import { MacroSettings } from '@/models/MacroSettings'

interface TemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: MacroTemplate | null
  onSave: (template: MacroTemplate) => void
}

export const TemplateDialog: React.FC<TemplateDialogProps> = ({
  open,
  onOpenChange,
  template,
  onSave,
}) => {
  const [editedTemplate, setEditedTemplate] = useState<MacroTemplate>({
    id: '',
    name: '',
    indicators: [],
  })

  useEffect(() => {
    if (template) {
      setEditedTemplate(template)
    } else {
      setEditedTemplate({
        id: String(Date.now()),
        name: '',
        indicators: [{ ...DEFAULT_INDICATOR, id: String(Date.now()) }],
      })
    }
  }, [template, open])

  const handleAddIndicator = () => {
    setEditedTemplate({
      ...editedTemplate,
      indicators: [
        ...editedTemplate.indicators,
        {
          ...DEFAULT_INDICATOR,
          id: String(Date.now()),
        },
      ],
    })
  }

  const handleRemoveIndicator = (indicatorId: string) => {
    setEditedTemplate({
      ...editedTemplate,
      indicators: editedTemplate.indicators.filter(
        (ind) => ind.id !== indicatorId
      ),
    })
  }

  const handleIndicatorTypeChange = (indicatorId: string, type: string) => {
    setEditedTemplate({
      ...editedTemplate,
      indicators: editedTemplate.indicators.map((ind) =>
        ind.id === indicatorId
          ? { ...ind, type: type as MacroSettings['type'] }
          : ind
      ),
    })
  }

  const handleValueChange = (
    indicatorId: string,
    year: number,
    scenario: (typeof SCENARIOS)[number],
    field: 'value' | 'probability',
    value: number
  ) => {
    setEditedTemplate({
      ...editedTemplate,
      indicators: editedTemplate.indicators.map((ind) => {
        if (ind.id === indicatorId) {
          return {
            ...ind,
            values: {
              ...ind.values,
              [year]: {
                ...ind.values[year],
                [scenario]: {
                  ...ind.values[year][scenario],
                  [field]: value,
                },
              },
            },
          }
        }
        return ind
      }),
    })
  }

  const handleSave = () => {
    onSave(editedTemplate)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {template ? 'Редактировать шаблон' : 'Новый шаблон'}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] space-y-6 overflow-y-auto">
          <div className="space-y-2 p-3">
            <Label htmlFor="templateName">Название шаблона</Label>
            <Input
              id="templateName"
              value={editedTemplate.name}
              onChange={(e) =>
                setEditedTemplate({
                  ...editedTemplate,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-4">
            {editedTemplate.indicators.map((indicator, index) => (
              <Card key={indicator.id}>
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Индикатор {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveIndicator(indicator.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Тип индикатора</Label>
                    <Select
                      value={indicator.type}
                      onValueChange={(value) =>
                        handleIndicatorTypeChange(indicator.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDICATOR_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {indicatorNames[type]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {YEARS.map((year) => (
                    <div key={year} className="space-y-2">
                      <h5 className="font-medium">Год {year}</h5>
                      <div className="grid grid-cols-3 gap-4">
                        {SCENARIOS.map((scenario) => (
                          <div key={scenario} className="space-y-2">
                            <Label>{scenarioNames[scenario]}</Label>
                            <div className="space-y-2">
                              <Input
                                type="number"
                                placeholder="Значение"
                                value={indicator.values[year][scenario].value}
                                onChange={(e) =>
                                  handleValueChange(
                                    indicator.id,
                                    year,
                                    scenario,
                                    'value',
                                    Number(e.target.value)
                                  )
                                }
                              />
                              <Input
                                type="number"
                                placeholder="Вероятность"
                                value={
                                  indicator.values[year][scenario].probability
                                }
                                onChange={(e) =>
                                  handleValueChange(
                                    indicator.id,
                                    year,
                                    scenario,
                                    'probability',
                                    Number(e.target.value)
                                  )
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={handleAddIndicator}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Добавить индикатор
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
