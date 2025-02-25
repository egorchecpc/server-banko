import React, { useState, useEffect } from 'react'
import { CardContent, CardFooter } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, RotateCcw, Send } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

// Типы для настроек моделей
interface LinearModelSettings {
  robust: boolean
  heteroskedasticity: boolean
  weights: string
}

interface LogisticModelSettings {
  family: string
  link: string
  probCutoff: number
}

interface TimeSeriesModelSettings {
  order: number
  seasonalOrder: number
  forecast: number
}

interface AdditionalSettings {
  linear: LinearModelSettings
  logistic: LogisticModelSettings
  timeseries: TimeSeriesModelSettings
  [key: string]: any
}

interface ModelSettings {
  useLogarithm: boolean
  interceptValue: number
  slopeValue: number
  confidenceInterval: number
  variableSelection: string
  crossValidation: boolean
  cvFolds: number
  outputFormat: string
  predictNewData: boolean
  additional: any
}

interface ModelPayload {
  modelType: string
  formula: string
  settings: ModelSettings
}

type ModelType =
  | 'linear'
  | 'logistic'
  | 'poisson'
  | 'timeseries'
  | 'exponential'
  | 'randomforest'
  | 'svm'

interface Variable {
  id: string
  name: string
  description: string
  selected: boolean
}

export const RModelSettingsModule: React.FC = () => {
  // Основные настройки модели
  const [modelType, setModelType] = useState<ModelType>('linear')
  const [useLogarithm, setUseLogarithm] = useState<boolean>(false)
  const [interceptValue, setInterceptValue] = useState<number>(0)
  const [slopeValue, setSlopeValue] = useState<number>(1)
  const [confidenceInterval, setConfidenceInterval] = useState<number>(0.95)
  const [variableSelection, setVariableSelection] = useState<string>('stepwise')
  const [crossValidation, setCrossValidation] = useState<boolean>(false)
  const [cvFolds, setCvFolds] = useState<number>(5)
  const [outputFormat, setOutputFormat] = useState<string>('summary')
  const [predictNewData, setPredictNewData] = useState<boolean>(false)
  const [formulaExpression, setFormulaExpression] = useState<string>('y ~ ')

  // Переменные для выбора
  const [variables, setVariables] = useState<Variable[]>([
    {
      id: 'x1',
      name: 'РРП',
      description: 'Рентабельность реализованной продукции',
      selected: false,
    },
    {
      id: 'x2',
      name: 'ННЗП',
      description: 'Номинальная начисленная заработная плата',
      selected: false,
    },
    {
      id: 'x3',
      name: 'ВВП',
      description: 'Валовой внутренний продукт',
      selected: false,
    },
    {
      id: 'x4',
      name: 'РРДН',
      description: 'Реальные располагаемые доходы населения',
      selected: false,
    },
    {
      id: 'x5',
      name: 'СМЗ',
      description: 'Среднемесячная заработная плата',
      selected: false,
    },
  ])

  // Расширенные настройки для разных типов моделей
  const [additionalSettings, setAdditionalSettings] =
    useState<AdditionalSettings>({
      // Линейная регрессия
      linear: {
        robust: false,
        heteroskedasticity: false,
        weights: 'none',
      },
      // Логистическая регрессия
      logistic: {
        family: 'binomial',
        link: 'logit',
        probCutoff: 0.5,
      },
      // Временные ряды
      timeseries: {
        order: 1,
        seasonalOrder: 0,
        forecast: 12,
      },
    })

  // Обновление формулы при изменении выбранных переменных
  useEffect(() => {
    const selectedVars = variables
      .filter((v) => v.selected)
      .map((v) => v.id)
      .join(' + ')

    setFormulaExpression(selectedVars ? `y ~ ${selectedVars}` : 'y ~ 1')
  }, [variables])

  // Обработчик выбора переменных
  const handleVariableToggle = (variableId: string): void => {
    setVariables((prevVars) =>
      prevVars.map((variable) =>
        variable.id === variableId
          ? { ...variable, selected: !variable.selected }
          : variable
      )
    )
  }

  // Обработчик изменения дополнительных настроек
  const handleAdditionalSettingChange = (
    modelType: string,
    setting: string,
    value: any
  ): void => {
    setAdditionalSettings((prev) => ({
      ...prev,
      [modelType]: {
        ...prev[modelType],
        [setting]: value,
      },
    }))
  }

  // Отправка данных на бэкенд
  const handleSubmit = (): void => {
    const payload: ModelPayload = {
      modelType,
      formula: formulaExpression,
      settings: {
        useLogarithm,
        interceptValue: parseFloat(interceptValue.toString()),
        slopeValue: parseFloat(slopeValue.toString()),
        confidenceInterval: parseFloat(confidenceInterval.toString()),
        variableSelection,
        crossValidation,
        cvFolds: parseInt(cvFolds.toString()),
        outputFormat,
        predictNewData,
        additional: additionalSettings[modelType],
      },
    }

    console.log('Отправка на бэкенд:', payload)
    // В реальном приложении здесь был бы код для отправки данных на сервер
    alert('Настройки модели отправлены на сервер')
  }

  // Сброс настроек
  const resetSettings = (): void => {
    setModelType('linear')
    setUseLogarithm(false)
    setInterceptValue(0)
    setSlopeValue(1)
    setConfidenceInterval(0.95)
    setVariableSelection('stepwise')
    setCrossValidation(false)
    setCvFolds(5)
    setOutputFormat('summary')
    setPredictNewData(false)
    setVariables((prevVars) => prevVars.map((v) => ({ ...v, selected: false })))
  }

  return (
    <div className="space-y-6">
      <div className="flex w-full">
        <div className="flex flex-col items-start">
          <div className="text-xl font-bold leading-24 text-black-800">
            Параметры статистической модели
          </div>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="flex w-full justify-between">
          <TabsTrigger value="basic" className="w-1/3">
            Основные
          </TabsTrigger>
          <TabsTrigger value="model" className="w-1/3">
            Параметры модели
          </TabsTrigger>
          <TabsTrigger value="advanced" className="w-1/3">
            Расширенные
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="px-4">
          <CardContent className="space-y-4">
            {/* Тип модели */}
            <div className="space-y-2">
              <Label htmlFor="modelType">Тип модели</Label>
              <Select
                value={modelType}
                onValueChange={(value) => setModelType(value as ModelType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите тип модели" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Регрессионные модели</SelectLabel>
                    <SelectItem value="linear">Линейная регрессия</SelectItem>
                    <SelectItem value="logistic">
                      Логистическая регрессия
                    </SelectItem>
                    <SelectItem value="poisson">
                      Пуассоновская регрессия
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Временные ряды</SelectLabel>
                    <SelectItem value="timeseries">ARIMA</SelectItem>
                    <SelectItem value="exponential">
                      Экспоненциальное сглаживание
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Машинное обучение</SelectLabel>
                    <SelectItem value="randomforest">Случайный лес</SelectItem>
                    <SelectItem value="svm">Support Vector Machine</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Выбор переменных */}
            <div className="space-y-2">
              <Label htmlFor="variables">Выбор переменных для модели</Label>
              <div className="space-y-2 rounded-md border p-4">
                {variables.map((variable) => (
                  <div
                    key={variable.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={variable.id}
                      checked={variable.selected}
                      onCheckedChange={() => handleVariableToggle(variable.id)}
                    />
                    <Label
                      htmlFor={variable.id}
                      className="flex cursor-pointer items-center"
                    >
                      <span className="ml-2 font-medium">{variable.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({variable.id})
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        - {variable.description}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Формула модели */}
            <div className="space-y-2">
              <Label htmlFor="formula">Формула модели (R синтаксис)</Label>
              <Input
                id="formula"
                value={formulaExpression}
                onChange={(e) => setFormulaExpression(e.target.value)}
                placeholder="Например: y ~ x1 + x2"
                className="font-mono"
              />
            </div>

            {/* Логарифмирование */}
            <div className="flex items-center justify-between">
              <Label htmlFor="log-transform" className="flex-1">
                Логарифмическое преобразование данных
              </Label>
              <Switch
                id="log-transform"
                checked={useLogarithm}
                onCheckedChange={setUseLogarithm}
              />
            </div>

            {/* Отбор переменных */}
            <div className="space-y-2">
              <Label htmlFor="variableSelection">Метод отбора переменных</Label>
              <Select
                value={variableSelection}
                onValueChange={setVariableSelection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите метод" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Без отбора</SelectItem>
                  <SelectItem value="forward">Прямой отбор</SelectItem>
                  <SelectItem value="backward">Обратный отбор</SelectItem>
                  <SelectItem value="stepwise">Пошаговый отбор</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Кросс-валидация */}
            <div className="flex items-center justify-between">
              <Label htmlFor="cross-validation" className="flex-1">
                Кросс-валидация
              </Label>
              <Switch
                id="cross-validation"
                checked={crossValidation}
                onCheckedChange={setCrossValidation}
              />
            </div>

            {/* Количество фолдов кросс-валидации */}
            {crossValidation && (
              <div className="space-y-2">
                <Label htmlFor="cv-folds">Количество фолдов</Label>
                <Input
                  id="cv-folds"
                  type="number"
                  min={2}
                  max={20}
                  value={cvFolds}
                  onChange={(e) => setCvFolds(parseInt(e.target.value))}
                />
              </div>
            )}
          </CardContent>
        </TabsContent>

        <TabsContent value="model" className="px-4">
          <CardContent className="space-y-4">
            {modelType === 'linear' && (
              <>
                <div className="space-y-2">
                  <Label>Коэффициент свободного члена: {interceptValue}</Label>
                  <Slider
                    value={[interceptValue]}
                    min={-10}
                    max={10}
                    step={0.1}
                    onValueChange={(value) => setInterceptValue(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Коэффициент наклона: {slopeValue}</Label>
                  <Slider
                    value={[slopeValue]}
                    min={-5}
                    max={5}
                    step={0.1}
                    onValueChange={(value) => setSlopeValue(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Доверительный интервал:{' '}
                    {(confidenceInterval * 100).toFixed(0)}%
                  </Label>
                  <Slider
                    value={[confidenceInterval]}
                    min={0.8}
                    max={0.99}
                    step={0.01}
                    onValueChange={(value) => setConfidenceInterval(value[0])}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="robust-regression" className="flex-1">
                    Робастная регрессия
                  </Label>
                  <Switch
                    id="robust-regression"
                    checked={additionalSettings.linear.robust}
                    onCheckedChange={(value) =>
                      handleAdditionalSettingChange('linear', 'robust', value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="heteroskedasticity" className="flex-1">
                    Корректировка гетероскедастичности
                  </Label>
                  <Switch
                    id="heteroskedasticity"
                    checked={additionalSettings.linear.heteroskedasticity}
                    onCheckedChange={(value) =>
                      handleAdditionalSettingChange(
                        'linear',
                        'heteroskedasticity',
                        value
                      )
                    }
                  />
                </div>
              </>
            )}

            {modelType === 'logistic' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="logistic-family">
                    Семейство распределений
                  </Label>
                  <Select
                    value={additionalSettings.logistic.family}
                    onValueChange={(value) =>
                      handleAdditionalSettingChange('logistic', 'family', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите семейство" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="binomial">Биномиальное</SelectItem>
                      <SelectItem value="quasibinomial">
                        Квазибиномиальное
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logistic-link">Функция связи</Label>
                  <Select
                    value={additionalSettings.logistic.link}
                    onValueChange={(value) =>
                      handleAdditionalSettingChange('logistic', 'link', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите функцию связи" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="logit">Логит</SelectItem>
                      <SelectItem value="probit">Пробит</SelectItem>
                      <SelectItem value="cloglog">
                        Комплементарный лог-лог
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    Порог вероятности: {additionalSettings.logistic.probCutoff}
                  </Label>
                  <Slider
                    value={[additionalSettings.logistic.probCutoff]}
                    min={0.1}
                    max={0.9}
                    step={0.05}
                    onValueChange={(value) =>
                      handleAdditionalSettingChange(
                        'logistic',
                        'probCutoff',
                        value[0]
                      )
                    }
                  />
                </div>
              </>
            )}

            {modelType === 'timeseries' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="arima-order">Порядок AR компонента (p)</Label>
                  <Input
                    id="arima-order"
                    type="number"
                    min={0}
                    max={5}
                    value={additionalSettings.timeseries.order}
                    onChange={(e) =>
                      handleAdditionalSettingChange(
                        'timeseries',
                        'order',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seasonal-order">Сезонный порядок</Label>
                  <Input
                    id="seasonal-order"
                    type="number"
                    min={0}
                    max={12}
                    value={additionalSettings.timeseries.seasonalOrder}
                    onChange={(e) =>
                      handleAdditionalSettingChange(
                        'timeseries',
                        'seasonalOrder',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="forecast-periods">Период прогноза</Label>
                  <Input
                    id="forecast-periods"
                    type="number"
                    min={1}
                    max={36}
                    value={additionalSettings.timeseries.forecast}
                    onChange={(e) =>
                      handleAdditionalSettingChange(
                        'timeseries',
                        'forecast',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </>
            )}
          </CardContent>
        </TabsContent>

        <TabsContent value="advanced" className="px-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="output-format">Формат вывода результатов</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите формат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Краткий отчет</SelectItem>
                  <SelectItem value="full">Полный отчет</SelectItem>
                  <SelectItem value="anova">ANOVA таблица</SelectItem>
                  <SelectItem value="diagnostic">
                    Диагностические графики
                  </SelectItem>
                  <SelectItem value="json">JSON данные</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="predict-new" className="flex-1">
                Прогнозировать на новых данных
              </Label>
              <Switch
                id="predict-new"
                checked={predictNewData}
                onCheckedChange={setPredictNewData}
              />
            </div>

            {predictNewData && (
              <div className="rounded-md bg-slate-100 p-4">
                <p className="mb-2 text-sm text-slate-700">
                  При активации этой опции модель будет использована для
                  прогнозирования на новых данных. Убедитесь, что данные
                  загружены на сервер до запуска модели.
                </p>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>

      <CardFooter className="mt-4 flex justify-between py-4">
        <Button
          variant="outline"
          onClick={resetSettings}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" /> Сбросить
        </Button>
        <div className="flex space-x-2">
          <Button variant="secondary" className="flex items-center gap-2">
            <Save className="h-4 w-4" /> Сохранить настройки
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" /> Запустить модель
          </Button>
        </div>
      </CardFooter>
    </div>
  )
}

export default RModelSettingsModule
