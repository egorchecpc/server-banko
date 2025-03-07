import type React from 'react'
import { useEffect } from 'react'
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
import type { MacroTemplate } from '@/models/MacroTemplate'
import {
  DEFAULT_INDICATOR,
  INDICATOR_TYPES,
  indicatorNames,
  scenarioNames,
  SCENARIOS,
  YEARS,
} from '@/pages/Profile/TemplateDialog/TemplateDialogConfig'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

interface TemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: MacroTemplate | null
  onSave: (template: MacroTemplate) => void
}

const templateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Имя шаблона невалидно'),
  indicators: z.array(
    z.object({
      id: z.string(),
      type: z.string().min(1, 'Тип индикатора невалиден'),
      values: z.record(
        z.string(),
        z
          .record(
            z.string(),
            z.object({
              value: z.number().min(0.01, 'Значение должно быть больше 0'),
              probability: z.number().min(0).max(100),
            })
          )
          .refine(
            (scenarios) => {
              const probabilities = Object.values(scenarios).map(
                (s) => s.probability
              )
              const totalProbability = probabilities.reduce((a, b) => a + b, 0)
              return Math.abs(totalProbability - 100) < 0.01
            },
            { message: 'Сумма вероятностей должна быть равна 100%' }
          )
      ),
    })
  ),
})

type TemplateFormData = z.infer<typeof templateSchema>

export const TemplateDialog: React.FC<TemplateDialogProps> = ({
  open,
  onOpenChange,
  template,
  onSave,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    mode: 'all',
    defaultValues: {
      id: '',
      name: '',
      indicators: [{ ...DEFAULT_INDICATOR }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'indicators',
  })

  useEffect(() => {
    if (template) {
      reset(template)
    } else {
      reset({
        id: String(Date.now()),
        name: '',
        indicators: [{ ...DEFAULT_INDICATOR, id: String(Date.now()) }],
      })
    }
  }, [template, reset])

  const handleAddIndicator = () => {
    append({
      ...DEFAULT_INDICATOR,
      id: String(Date.now()),
    })
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      showErrors()
    }
  }, [errors])

  const onSubmit = (data: TemplateFormData) => {
    try {
      onSave(data)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving template:', error)
      toast.error('Ошибка при сохранении шаблона')
      showErrors()
    }
  }

  const showErrors = () => {
    if (errors.name) {
      toast.error(errors.name.message)
    }
    if (Array.isArray(errors.indicators)) {
      errors?.indicators?.forEach((indicator, index) => {
        if (indicator?.type) {
          toast.error(`Индикатор ${index + 1}: ${indicator.type}`)
        }

        if (indicator?.values) {
          Object.entries(indicator.values).forEach(([year, yearError]) => {
            if (typeof yearError === 'object') {
              Object.entries(yearError).forEach(
                ([scenario, scenarioError]: [string, any]) => {
                  if (scenarioError?.value?.message) {
                    toast.error(
                      `Индикатор ${index + 1}, Год ${year}, ${scenarioNames[scenario]}: ${scenarioError.value.message}`
                    )
                  }
                  if (scenarioError?.probability?.message) {
                    toast.error(
                      `Индикатор ${index + 1}, Год ${year}, ${scenarioNames[scenario]}: ${scenarioError.probability.message}`
                    )
                  }
                }
              )
              if (yearError?.message) {
                toast.error(
                  `Индикатор ${index + 1}, Год ${year}: ${yearError.message}`
                )
              }
            }
          })
        }
      })
    }
  }

  const handleValueChange = (
    index: number,
    year: number | string,
    scenario: string,
    field: 'value' | 'probability',
    inputValue: string
  ) => {
    const value = Number.parseFloat(inputValue)
    if (!isNaN(value)) {
      if (typeof year !== 'string') {
        year = String(year)
      }
      setValue(
        `indicators.${index}.values.${String(year)}.${scenario}.${field}` as keyof TemplateFormData,
        value,
        {
          shouldValidate: true,
        }
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {template ? 'Редактировать шаблон' : 'Новый шаблон'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit, showErrors)}>
          <div className="overflow-y-none max-h-[60vh] space-y-6">
            <div className="space-y-2 p-3">
              <Label htmlFor="templateName">Название шаблона</Label>
              <Input
                id="templateName"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent className="space-y-4 p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Индикатор {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Тип индикатора</Label>
                      <Select
                        onValueChange={(value) =>
                          setValue(`indicators.${index}.type`, value, {
                            shouldValidate: true,
                          })
                        }
                        value={field.type}
                      >
                        <SelectTrigger
                          className={
                            errors.indicators?.[index]?.type
                              ? 'border-red-500'
                              : ''
                          }
                        >
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
                                  type="text"
                                  placeholder="Значение"
                                  defaultValue={
                                    field.values?.[year]?.[scenario]?.value ?? 0
                                  }
                                  onChange={(e) =>
                                    handleValueChange(
                                      index,
                                      year,
                                      scenario,
                                      'value',
                                      e.target.value
                                    )
                                  }
                                  className={
                                    errors.indicators?.[index]?.values?.[
                                      year
                                    ]?.[scenario]?.value
                                      ? 'border-red-500'
                                      : ''
                                  }
                                />
                                <Input
                                  type="text"
                                  placeholder="Вероятность"
                                  defaultValue={
                                    field.values?.[year]?.[scenario]
                                      ?.probability ?? 0
                                  }
                                  onChange={(e) =>
                                    handleValueChange(
                                      index,
                                      year,
                                      scenario,
                                      'probability',
                                      e.target.value
                                    )
                                  }
                                  className={
                                    errors.indicators?.[index]?.values?.[
                                      year
                                    ]?.[scenario]?.probability
                                      ? 'border-red-500'
                                      : ''
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
              type="button"
              variant="outline"
              onClick={handleAddIndicator}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Добавить индикатор
            </Button>

            <div className="flex items-center justify-end gap-3 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Отмена
              </Button>
              <Button type="submit" variant="primary">
                Сохранить
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
