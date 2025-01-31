import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HeatmapData } from '@/models/Heatmap'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import HeatmapChartModule from '@/modules/HeatmapChartModule/HeatmapChartModule'
import {
  ContainerBody,
  ContainerComponent,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Settings } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from '@tanstack/react-router'

interface MacroFactor {
  name: string
  currentValue: number
  newValue: number
  visible: boolean
}

interface StressDashboardProps {
  reportDate: string
}

export const StressTestingPage: React.FC<StressDashboardProps> = ({
  reportDate = new Date().toLocaleDateString(),
}) => {
  const [macroFactors, setMacroFactors] = useState<MacroFactor[]>([
    {
      name: 'Рентабельность продукции',
      currentValue: 122500,
      newValue: 122500,
      visible: true,
    },
    {
      name: 'Реальная заработная плата',
      currentValue: 10480,
      newValue: 10480,
      visible: true,
    },
    { name: 'ВВП', currentValue: 10480, newValue: 10480, visible: true },
    {
      name: 'Реально располагаемые доходы населения',
      currentValue: 10480,
      newValue: 10480,
      visible: true,
    },
    {
      name: 'Средняя месячная зарплата',
      currentValue: 10480,
      newValue: 10480,
      visible: true,
    },
  ])

  const [pdHeatmapData, setPDHeatmapData] = useState<HeatmapData>({
    categories: [
      'Потребительские кредиты',
      'Ипотечные кредиты',
      'Автокредитование',
      'Финансовая аренда (лизинг)',
      'Овердрафт',
      'и другие',
    ],
    periods: ['Не просроченные', '0-30', '31-60', '61-90', '90+'],
    values: [
      [4.54, 17.69, 38.0, 69.4, 100.0],
      [0.5, 18.0, 47.0, 98.0, 100.0],
      [4.0, 1.0, 54.0, 80.0, 100.0],
      [11.0, 34.0, 56.0, 75.0, 100.0],
      [21.0, 34.0, 47.0, 69.0, 100.0],
      [10.0, 37.0, 70.0, 90.0, 100.0],
    ],
  })

  const [eclData, setECLData] = useState([
    { name: 'Базовый', ecl: 10480 },
    { name: 'Стресс +50% PD', ecl: 15720 },
  ])

  const toggleMacroFactorVisibility = (index: number) => {
    const updatedFactors = [...macroFactors]
    updatedFactors[index].visible = !updatedFactors[index].visible
    setMacroFactors(updatedFactors)
  }

  const handleMacroFactorChange = (index: number, value: number) => {
    const updatedFactors = [...macroFactors]
    updatedFactors[index].newValue = value
    setMacroFactors(updatedFactors)
  }

  const recalculateStressScenario = () => {
    setPDHeatmapData((prev) => ({
      categories: prev.categories,
      periods: prev.periods,
      values: prev.values.map((row) => row.map((val) => val * 1.5)),
    }))

    setECLData([
      { name: 'Базовый', ecl: 10480 },
      { name: 'Стресс +50% PD', ecl: 15720 },
    ])
  }

  return (
    <div className="space-y-4 px-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/reports">Главная страница</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Стресс-тестирование</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold leading-38 text-black-900">
            {`Стресс-тестирование на ${reportDate}`}
          </div>
        </div>
      </div>
      <ContainerComponent withBg={true}>
        <ContainerHeader>
          <div className="my-1 flex items-center gap-3">
            <div className="text-xl font-bold leading-24 text-black-800">
              Макропоказатели
            </div>
            <Popover>
              <PopoverTrigger>
                <Settings className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  {macroFactors.map((factor, index) => (
                    <div
                      key={factor.name}
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
        </ContainerHeader>

        <ContainerBody isScrolling={true} orientation={'horizontal'}>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col justify-between space-y-4">
                {macroFactors
                  .filter((f) => f.visible)
                  .map((factor) => (
                    <Label key={factor.name} className="block">
                      {factor.name}
                    </Label>
                  ))}
              </div>
              <div className="space-y-4">
                {macroFactors
                  .filter((f) => f.visible)
                  .map((factor, index) => (
                    <Input
                      key={index}
                      type="text"
                      value={factor.newValue}
                      onChange={(e) =>
                        handleMacroFactorChange(
                          macroFactors.findIndex((f) => f.name === factor.name),
                          Number(e.target.value)
                        )
                      }
                    />
                  ))}
              </div>
              <div className="col-span-2 mt-4 flex justify-center">
                <Button onClick={recalculateStressScenario} variant="primary">
                  Пересчитать сценарий
                </Button>
              </div>
            </div>
          </div>
        </ContainerBody>
      </ContainerComponent>

      <div className="flex gap-3">
        <div className="flex-grow-[2]">
          <HeatmapChartModule
            data={pdHeatmapData}
            title="Тепловая карта: Изменения PD при стресс-сценарии"
          />
        </div>

        <div className="flex-grow">
          <ContainerComponent withBg={true} title={'Изменение ECL'}>
            <ContainerBody isScrolling={true} orientation={'horizontal'}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={eclData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ecl" fill="#8884d8" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </ContainerBody>
          </ContainerComponent>
        </div>
      </div>
    </div>
  )
}
