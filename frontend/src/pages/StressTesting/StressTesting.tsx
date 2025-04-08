import React, { useState } from 'react'
import { HeatmapData } from '@/models/Heatmap'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts'
import HeatmapChartModule from '@/modules/HeatmapChartModule/HeatmapChartModule'
import {
  ContainerBody,
  ContainerComponent,
} from '@/components/ContainerComponent/ContainerComponent'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from '@tanstack/react-router'
import MacroFactorsComponent from '@/pages/StressTesting/MacroFactorsComponent'

interface TornadoChartData {
  parameter: string
  value: number
  effect: 'positive' | 'negative'
}

interface StressDashboardProps {
  reportDate: string
}

export const StressTestingPage: React.FC<StressDashboardProps> = ({
  reportDate = new Date().toLocaleDateString(),
}) => {
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

  // Tornado chart data
  const [tornadoData, setTornadoData] = useState<TornadoChartData[]>([
    { parameter: 'Рост дефолтов', value: 40, effect: 'positive' },
    { parameter: 'Уровень безработицы', value: -20, effect: 'negative' },
    { parameter: 'Снижение ВВП', value: 15, effect: 'positive' },
    { parameter: 'Изменение % ставки', value: -8, effect: 'negative' },
    { parameter: 'Изменение LTV', value: 5, effect: 'positive' },
  ])

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
          <div className="text-2xl font-bold leading-38 text-black-1000">
            {`Стресс-тестирование на ${reportDate}`}
          </div>
        </div>
      </div>
      <div className="my-16">
        <MacroFactorsComponent onRecalculate={recalculateStressScenario} />
      </div>

      {/* Тепловая карта на всю ширину */}
      <div className="w-full">
        <HeatmapChartModule
          data={pdHeatmapData}
          title="Тепловая карта: Изменения PD при стресс-сценарии"
        />
      </div>

      {/* Tornado Chart */}
      <div className="flex gap-4">
        <div className="w-2/3">
          <ContainerComponent
            withBg={true}
            title={'Торнадо-диаграмма чувствительности параметров'}
          >
            <ContainerBody isScrolling={true} orientation={'horizontal'}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={tornadoData}
                  layout="vertical"
                  barCategoryGap={10}
                  margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
                >
                  <XAxis type="number" domain={[-35, 45]} tickCount={10} />
                  <YAxis type="category" dataKey="parameter" width={150} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    formatter={(value) => [`${value}`, 'Значение']}
                  />
                  <Bar dataKey="value">
                    {tornadoData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.effect === 'positive' ? '#45169a' : '#bdaff9'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ContainerBody>
          </ContainerComponent>
        </div>
        <div className="w-1/3">
          <ContainerComponent withBg={true} title={'Изменение ECL'}>
            <ContainerBody isScrolling={true} orientation={'horizontal'}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={eclData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                  <Legend />
                  <Bar dataKey="ecl" fill="#45169a" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </ContainerBody>
          </ContainerComponent>
        </div>
      </div>
    </div>
  )
}
