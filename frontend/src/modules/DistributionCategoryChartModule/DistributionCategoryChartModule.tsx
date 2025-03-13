import React, { useState } from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  ContainerBody,
  ContainerComponent,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { GearIcon } from '@radix-ui/react-icons'
import { CategoryChartItem } from '@/models/CategoryChartItem'

interface DistributionCategoryChartModuleProps {
  amountData: CategoryChartItem[]
  countData: CategoryChartItem[]
}

export const DistributionCategoryChartModule: React.FC<
  DistributionCategoryChartModuleProps
> = ({ amountData, countData }) => {
  const [isAmountMode, setIsAmountMode] = useState(true)
  const [groupByProduct, setGroupByProduct] = useState(false)

  // Преобразуем данные в зависимости от выбранного режима группировки
  const prepareData = (data: CategoryChartItem[]) => {
    if (!groupByProduct) {
      // Группировка по типам кредитов (верхний уровень)
      return data.map((item) => ({
        ...item,
        // Используем creditType вместо product для отображения на оси X
        product: item.creditType,
      }))
    } else {
      // Разворачиваем и добавляем все продукты
      return data.flatMap((creditType) =>
        creditType.products
          ? creditType.products.map((product) => ({
              ...product,
              // Добавляем префикс типа кредита для улучшения читаемости
              product: `${product.product}`,
            }))
          : []
      )
    }
  }

  const data = prepareData(isAmountMode ? amountData : countData)

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(value))
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const dataPoint = payload[0].payload

      return (
        <div className="rounded-md border bg-white p-2 shadow-md">
          <p className="mb-2 font-bold">{dataPoint.product}</p>
          {dataPoint.creditType &&
            dataPoint.creditType !== dataPoint.product && (
              <p className="mb-2 text-gray-600">{dataPoint.creditType}</p>
            )}
          <div>
            <div className="flex justify-between">
              <span>Без просрочки:</span>
              <span>{formatValue(dataPoint.without)}</span>
            </div>
            <div className="flex justify-between">
              <span>0-30 дней:</span>
              <span>{formatValue(dataPoint.between1To30)}</span>
            </div>
            <div className="flex justify-between">
              <span>30-60 дней:</span>
              <span>{formatValue(dataPoint.between31To60)}</span>
            </div>
            <div className="flex justify-between">
              <span>60-90 дней:</span>
              <span>{formatValue(dataPoint.between61To90)}</span>
            </div>
            <div className="flex justify-between">
              <span>90+ дней:</span>
              <span>{formatValue(dataPoint.moreThen90)}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ContainerComponent withBg={true}>
      <ContainerHeader>
        <div className="flex items-center">
          <div className="text-black-1000 text-xl font-bold leading-24">
            Распределение {isAmountMode ? 'ВБС' : 'количества'} по{' '}
            {groupByProduct ? 'продуктам' : 'типам кредитов'}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="!ring-none rounded-full px-2 pt-1 hover:bg-gray-200">
                <GearIcon />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Настройки отображения</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="flex items-center justify-between p-3"
              >
                <Label htmlFor="data-mode">Показывать суммы</Label>
                <Switch
                  id="data-mode"
                  checked={isAmountMode}
                  onCheckedChange={setIsAmountMode}
                />
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="flex items-center justify-between p-3"
              >
                <Label htmlFor="group-mode">Группировать по продуктам</Label>
                <Switch
                  id="group-mode"
                  checked={groupByProduct}
                  onCheckedChange={setGroupByProduct}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ContainerHeader>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis tickFormatter={(value) => formatValue(value)} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
              <Legend />
              <Bar
                dataKey="without"
                name="без просрочки"
                fill="lightblue"
                stackId="a"
                barSize={30}
              />
              <Bar
                dataKey="between1To30"
                name="0-30 дней"
                fill="var(--chart20)"
                stackId="a"
                barSize={30}
              />
              <Bar
                dataKey="between31To60"
                name="30-60 дней"
                fill="var(--chart40)"
                stackId="a"
                barSize={30}
              />
              <Bar
                dataKey="between61To90"
                name="60-90 дней"
                fill="var(--chart60)"
                stackId="a"
                barSize={30}
              />
              <Bar
                dataKey="moreThen90"
                name="90+ дней"
                fill="var(--chart80)"
                stackId="a"
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ContainerBody>
    </ContainerComponent>
  )
}
