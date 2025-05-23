import { FC, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm, Controller, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MacroSettings } from '@/models/MacroSettings'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  MacroSettingsErrors,
  macroSettingsSchema,
} from '@/modules/SidebarModule/MacroSettings/MacroSettingsModal/MacroSettingsModalConfig'

interface MacroSettingsModalProps {
  isOpen: boolean
  years: (string | number)[]
  macroIndicators: string[]
  onClose: () => void
  onSubmitForm: (data: MacroSettings) => void
  editingIndicator: MacroSettings | null
  scenarios: string[]
}

export const MacroSettingsModal: FC<MacroSettingsModalProps> = ({
  isOpen,
  years,
  macroIndicators,
  onClose,
  onSubmitForm,
  editingIndicator,
  scenarios,
}) => {
  const { t } = useTranslation()
  const [inputValues, setInputValues] = useState<Record<string, string>>({})

  const createInitialFormState = (): MacroSettings => {
    const values: Record<
      string | number,
      Record<string, { value: number; probability: number }>
    > = {}
    years.forEach((year) => {
      values[year as string | number] = {}
      scenarios.forEach((scenario: string) => {
        values[year as string | number][scenario as string] = {
          value: 0,
          probability: 0,
        }
      })
    })
    return {
      id: '',
      type: '',
      values,
    }
  }

  const form = useForm<MacroSettings>({
    defaultValues: createInitialFormState(),
    resolver: zodResolver(macroSettingsSchema),
  })

  const {
    reset,
    control,
    formState: { errors },
  } = form

  useEffect(() => {
    if (isOpen) {
      const initialData = editingIndicator || createInitialFormState()
      reset(initialData)

      // Initialize input values
      const newInputValues: Record<string, string> = {}
      years.forEach((year) => {
        scenarios.forEach((scenario) => {
          const valueKey = `${year}.${scenario}.value`
          const probKey = `${year}.${scenario}.probability`
          const value = initialData.values[year]?.[scenario]?.value
          const probability = initialData.values[year]?.[scenario]?.probability
          newInputValues[valueKey] = value ? String(value) : ''
          newInputValues[probKey] = probability ? String(probability) : ''
        })
      })
      setInputValues(newInputValues)
    }
  }, [editingIndicator, isOpen, reset, years, scenarios])

  const onSubmit = (data: MacroSettings) => {
    onSubmitForm(data)
  }

  const showToastForErrors = (errors: FieldErrors) => {
    const newYearErrors: Record<string, boolean> = {}

    if (errors.type) {
      toast.error(t('errorsModal.errorTypeMessage'))
    }

    const valuesErrors = errors.values as MacroSettingsErrors['values']
    if (valuesErrors) {
      for (const year of Object.keys(valuesErrors)) {
        const yearErrors = valuesErrors[year]
        let totalProbability = 0
        if (yearErrors) {
          for (const scenario of Object.keys(yearErrors)) {
            const scenarioErrors = yearErrors[scenario]
            if (scenarioErrors?.value) {
              toast.error(
                t('errorsModal.errorValueMessage', { year, scenario })
              )
              return
            }
            if (
              scenarioErrors?.probability &&
              typeof scenarioErrors?.probability === 'number'
            ) {
              totalProbability += scenarioErrors.probability
            }
          }
          if (totalProbability !== 100) {
            toast.error(t('errorsModal.errorProbabilityMessage', { year }))
            newYearErrors[year] = true
            return
          } else {
            newYearErrors[year] = false
          }
        }
      }
    }
  }

  const handleInputChange = (
    key: string,
    value: string,
    onChange: (value: number) => void
  ) => {
    // Разрешаем ввод чисел, точки и пустой строки
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setInputValues((prev) => ({
        ...prev,
        [key]: value,
      }))
      // Конвертируем в число только если строка не пустая и не одиночная точка
      if (value && value !== '.') {
        onChange(parseFloat(value))
      } else {
        onChange(0)
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[25rem]">
          <DialogHeader>
            <DialogTitle>
              {editingIndicator
                ? t('sidebar.macroSettings.modal.editTitle')
                : t('sidebar.macroSettings.modal.addTitle')}
            </DialogTitle>
          </DialogHeader>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!!editingIndicator}
              >
                <SelectTrigger
                  className={`rounded-md border-2 p-2 ${errors?.type ? 'border-red-500 text-red-500' : 'text-black-1000 border-grey-600'}`}
                >
                  <SelectValue
                    placeholder={t(
                      'sidebar.macroSettings.modal.macroTypes.default'
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  {macroIndicators.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {t(
                        `sidebar.macroSettings.modal.macroTypes.items.${item}`
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {years.map((year) => (
            <div key={year} className="space-y-2">
              <div className="text-black-1000 mb-4 text-md font-bold leading-18">
                {year}
              </div>
              <div className="mb-3 grid grid-cols-3 gap-1">
                <div className="text-md font-normal leading-18 text-grey-900">
                  {t('sidebar.macroSettings.modal.subtitles.scenario')}
                </div>
                <div className="text-black-1000 text-md font-semibold leading-18">
                  {t('sidebar.macroSettings.modal.subtitles.value')}
                </div>
                <div className="text-black-1000 text-md font-semibold leading-18">
                  {t('sidebar.macroSettings.modal.subtitles.probability')}
                </div>
              </div>
              {[
                t('sidebar.macroSettings.modal.subtitles.scenariosFull.worst'),
                t('sidebar.macroSettings.modal.subtitles.scenariosFull.normal'),
                t('sidebar.macroSettings.modal.subtitles.scenariosFull.best'),
              ].map((scenarioFull: string, index: number) => {
                const scenarioShort = scenarios[index]
                const valueKey = `${year}.${scenarioShort}.value`
                const probKey = `${year}.${scenarioShort}.probability`

                return (
                  <div
                    key={scenarioShort}
                    className="grid grid-cols-3 items-center gap-1"
                  >
                    <div className="modal-content-text">{scenarioFull}</div>
                    <Controller
                      name={`values.${year}.${scenarioShort}.value`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder={t(
                            'sidebar.macroSettings.modal.subtitles.value'
                          )}
                          className={`mt-2 w-full appearance-none ${
                            errors.values?.[year]?.[scenarioShort]?.value
                              ? 'border-red-500 text-red-500'
                              : 'text-black-1000 border border-grey-600'
                          }`}
                          value={inputValues[valueKey] || ''}
                          onChange={(e) =>
                            handleInputChange(
                              valueKey,
                              e.target.value,
                              field.onChange
                            )
                          }
                        />
                      )}
                    />
                    <Controller
                      name={`values.${year}.${scenarioShort}.probability`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder={t(
                            'sidebar.macroSettings.modal.subtitles.probability'
                          )}
                          className={`mt-2 w-full appearance-none ${
                            errors?.values?.[year]?.root?.message
                              ? 'border-red-500 text-red-500'
                              : 'text-black-1000 border border-grey-600'
                          }`}
                          value={inputValues[probKey] || ''}
                          onChange={(e) =>
                            handleInputChange(
                              probKey,
                              e.target.value,
                              field.onChange
                            )
                          }
                        />
                      )}
                    />
                  </div>
                )
              })}
            </div>
          ))}

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="w-full"
            >
              {t('sidebar.macroSettings.modal.buttons.cancelBtn')}
            </Button>
            <Button
              onClick={form.handleSubmit(
                (data) => {
                  onSubmit(data)
                },
                (errors) => {
                  showToastForErrors(errors)
                }
              )}
              variant="primary"
              className="w-full"
            >
              {t('sidebar.macroSettings.modal.buttons.saveBtn')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  )
}
