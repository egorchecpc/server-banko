import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Settings } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ContainerBody,
  ContainerComponent,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import { Badge } from '@/components/ui/badge'

interface MacroFactor {
  id: string
  name: string
  currentValue: number
  newValue: number
  visible: boolean
  sensitivity: number
  percentChange: number
  min: number
  max: number
}

const MacroFactorsComponent = ({ onRecalculate }) => {
  const initialMacroFactorsRef = useRef<MacroFactor[]>([
    {
      id: 'profitability',
      name: 'Рентабельность реализованной продукции',
      currentValue: 122500,
      newValue: 122500,
      visible: true,
      sensitivity: 1,
      percentChange: 0,
      min: -50,
      max: 50,
    },
    {
      id: 'nominalSalary',
      name: 'Номинальная начисленная заработная плата',
      currentValue: 10480,
      newValue: 10480,
      visible: false,
      sensitivity: 2,
      percentChange: 0,
      min: -30,
      max: 30,
    },
    {
      id: 'gdp',
      name: 'Валовой внутренний продукт',
      currentValue: 10480,
      newValue: 10480,
      visible: true,
      sensitivity: 5,
      percentChange: 0,
      min: -10,
      max: 10,
    },
    {
      id: 'disposableIncome',
      name: 'Реальные располагаемые доходы населения',
      currentValue: 10480,
      newValue: 10480,
      visible: false,
      sensitivity: 3,
      percentChange: 0,
      min: -20,
      max: 20,
    },
    {
      id: 'averageSalary',
      name: 'Среднемесячная заработная плата',
      currentValue: 10480,
      newValue: 10480,
      visible: true,
      sensitivity: 2,
      percentChange: 0,
      min: -30,
      max: 30,
    },
    {
      id: 'inflation',
      name: 'Инфляция',
      currentValue: 5.4,
      newValue: 5.4,
      visible: false,
      sensitivity: 8,
      percentChange: 0,
      min: -5,
      max: 5,
    },
    {
      id: 'refinancingRate',
      name: 'Ставка рефинансирования',
      currentValue: 7.5,
      newValue: 7.5,
      visible: false,
      sensitivity: 10,
      percentChange: 0,
      min: -3,
      max: 3,
    },
    {
      id: 'pdTTC',
      name: 'PD_TTC',
      currentValue: 3.2,
      newValue: 3.2,
      visible: false,
      sensitivity: 6,
      percentChange: 0,
      min: -15,
      max: 15,
    },
    {
      id: 'lgd',
      name: 'LGD',
      currentValue: 45.0,
      newValue: 45.0,
      visible: false,
      sensitivity: 4,
      percentChange: 0,
      min: -20,
      max: 20,
    },
    {
      id: 'unemploymentRate',
      name: 'Уровень безработицы',
      currentValue: 4.8,
      newValue: 4.8,
      visible: false,
      sensitivity: 7,
      percentChange: 0,
      min: -10,
      max: 10,
    },
  ])

  const [macroFactors, setMacroFactors] = useState<MacroFactor[]>(
    initialMacroFactorsRef.current
  )
  const [selectedFactorId, setSelectedFactorId] = useState<string>('')

  const handleSliderChange = (index: number, percentValue: number[]) => {
    const updatedFactors = [...macroFactors]
    const factor = updatedFactors[index]
    const percentChange = percentValue[0]
    factor.percentChange = percentChange
    factor.newValue = Number(
      (factor.currentValue * (1 + percentChange / 100)).toFixed(
        factor.currentValue >= 100 ? 0 : 1
      )
    )
    setMacroFactors(updatedFactors)
  }

  const toggleMacroFactorVisibility = (index: number) => {
    const updatedFactors = [...macroFactors]
    updatedFactors[index].visible = !updatedFactors[index].visible
    setMacroFactors(updatedFactors)
  }

  const handleAddFactor = () => {
    if (!selectedFactorId) return
    const updatedFactors = [...macroFactors]
    const index = updatedFactors.findIndex((f) => f.id === selectedFactorId)
    if (index !== -1) {
      updatedFactors[index].visible = true
      setMacroFactors(updatedFactors)
      setSelectedFactorId('')
    }
  }

  const handleResetFactors = () => {
    setMacroFactors(
      initialMacroFactorsRef.current.map((factor) => ({
        ...factor,
        newValue: factor.currentValue,
        percentChange: 0,
      }))
    )
  }

  const getChangeColor = (percentChange: number) => {
    if (percentChange > 0) return 'text-green-600'
    if (percentChange < 0) return 'text-red-600'
    return 'text-gray-500'
  }

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <ContainerComponent withBg={true}>
      <ContainerHeader>
        <div className="my-1 flex items-center justify-between gap-2">
          <div className="text-xl font-bold leading-24 text-black-1000">
            Макропоказатели
          </div>
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger>
                <Settings className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  {macroFactors.map((factor, index) => (
                    <div
                      key={factor.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={factor.visible}
                        onCheckedChange={() =>
                          toggleMacroFactorVisibility(index)
                        }
                      />
                      <Label>{factor.name}</Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </ContainerHeader>

      <ContainerBody isScrolling={true} orientation={'horizontal'}>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4 flex items-end gap-4">
              <div className="flex-grow">
                <Label htmlFor="parameter-select" className="mb-2 block">
                  Выберите параметр для стресс-тестирования
                </Label>
                <Select
                  value={selectedFactorId}
                  onValueChange={setSelectedFactorId}
                >
                  <SelectTrigger id="parameter-select" className="w-full">
                    <SelectValue placeholder="Выберите параметр" />
                  </SelectTrigger>
                  <SelectContent>
                    {macroFactors
                      .filter((f) => !f.visible)
                      .map((factor) => (
                        <SelectItem key={factor.id} value={factor.id}>
                          {factor.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddFactor} variant="outline">
                Добавить
              </Button>
            </div>

            <div className="mb-4 space-y-6">
              {macroFactors
                .filter((f) => f.visible)
                .map((factor, visibleIndex) => {
                  const index = macroFactors.findIndex(
                    (f) => f.id === factor.id
                  )
                  return (
                    <div key={factor.id} className="grid grid-cols-1 gap-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-medium">{factor.name}</Label>
                        <div className="flex items-center gap-2">
                          <span
                            className={getChangeColor(factor.percentChange)}
                          >
                            {factor.percentChange > 0 ? '+' : ''}
                            {factor.percentChange}%
                          </span>
                          <Badge variant={'outline'} className="ml-2">
                            {formatNumber(factor.newValue)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-10 text-right text-xs text-gray-500">
                          {factor.min}%
                        </span>
                        <Slider
                          value={[factor.percentChange]}
                          min={factor.min}
                          max={factor.max}
                          step={0.1}
                          onValueChange={(values) =>
                            handleSliderChange(index, values)
                          }
                          className="flex-grow"
                        />
                        <span className="w-10 text-left text-xs text-gray-500">
                          {factor.max}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          {formatNumber(
                            Math.round(
                              factor.currentValue * (1 + factor.min / 100)
                            )
                          )}
                        </span>
                        <span>
                          Базовое: {formatNumber(factor.currentValue)}
                        </span>
                        <span>
                          {formatNumber(
                            Math.round(
                              factor.currentValue * (1 + factor.max / 100)
                            )
                          )}
                        </span>
                      </div>
                    </div>
                  )
                })}
            </div>

            <div className="mt-4 flex justify-center gap-4">
              <Button onClick={onRecalculate} variant="primary">
                Пересчитать сценарий
              </Button>
              <Button onClick={handleResetFactors} variant="secondary">
                Сбросить
              </Button>
            </div>
          </div>
        </div>
      </ContainerBody>
    </ContainerComponent>
  )
}

export default MacroFactorsComponent
