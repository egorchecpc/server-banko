import React, { useState, useMemo } from 'react'
import {
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts'
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
import { Checkbox } from '@/components/ui/checkbox'
import { CONFIG } from '@/modules/AgeingAmountsChartModule/AgeingAmountChartConfig'
import { ProductData } from '@/models/AgeingAmount'
import {
  ContainerBody,
  ContainerComponent,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import { GearIcon } from '@radix-ui/react-icons'

type AgeingAmountChartModuleProps = {
  data: ProductData[]
}

type DetailedPeriodData = {
  name: string
  value: number
  absoluteValue: number
  periodTotal: number
  details: {
    productName: string
    value: number
    percentage: number
  }[]
}

const AgeingAmountChartModule: React.FC<AgeingAmountChartModuleProps> = ({
  data,
}) => {
  const [showPercentage, setShowPercentage] = useState(false)
  const [productSettings, setProductSettings] = useState(
    data.map((product) => ({
      productName: product.productName,
      isVisible: true,
      color: CONFIG.colors[product.productName as keyof typeof CONFIG.colors],
    }))
  )

  const toggleProduct = (productName: string) => {
    setProductSettings((prev) =>
      prev.map((setting) =>
        setting.productName === productName
          ? { ...setting, isVisible: !setting.isVisible }
          : setting
      )
    )
  }

  const pieData = useMemo(() => {
    const visibleProducts = productSettings.filter(
      (setting) => setting.isVisible
    )

    if (visibleProducts.length === 0) {
      return []
    }

    // Сначала собираем все данные по периодам
    const periodTotals: { [key: string]: number } = {}
    const periodDetails: { [key: string]: { [productName: string]: number } } =
      {}

    // Инициализируем структуры данных
    Object.keys(data[0].periods).forEach((period) => {
      periodTotals[period] = 0
      periodDetails[period] = {}
    })

    // Собираем данные по всем продуктам (включая невидимые) для общего числа
    data.forEach((product) => {
      Object.entries(product.periods).forEach(([period, value]) => {
        periodTotals[period] += value
      })
    })

    // Собираем детальные данные только по видимым продуктам
    visibleProducts.forEach((setting) => {
      const productData = data.find(
        (p) => p.productName === setting.productName
      )
      if (productData) {
        Object.entries(productData.periods).forEach(([period, value]) => {
          periodDetails[period][setting.productName] = value
        })
      }
    })

    // Формируем итоговые данные
    const result: DetailedPeriodData[] = Object.entries(periodDetails).map(
      ([period, products]) => {
        const periodTotal = periodTotals[period]
        const visibleTotal = Object.values(products).reduce(
          (sum, value) => sum + value,
          0
        )

        return {
          name: CONFIG.periods[period as keyof typeof CONFIG.periods],
          value: showPercentage
            ? (visibleTotal / periodTotal) * 100
            : visibleTotal,
          absoluteValue: visibleTotal,
          periodTotal,
          details: Object.entries(products).map(([productName, value]) => ({
            productName,
            value,
            percentage: (value / periodTotal) * 100,
          })),
        }
      }
    )

    return result.filter((item) => item.absoluteValue > 0)
  }, [data, productSettings, showPercentage])

  const formatValue = (value: number) => {
    if (showPercentage) {
      return `${value.toFixed(1)}%`
    }
    return new Intl.NumberFormat('ru-RU').format(Math.round(value))
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload as DetailedPeriodData
      return (
        <div className="rounded-md border bg-white p-2 shadow-md">
          <p className="font-bold">{data.name}</p>
          <div className="mt-2">
            {data.details.map((detail) => (
              <div
                key={detail.productName}
                className="flex justify-between gap-4"
              >
                <span
                  style={{
                    color:
                      CONFIG.colors[
                        detail.productName as keyof typeof CONFIG.colors
                      ],
                  }}
                >
                  {detail.productName}:
                </span>
                <span>
                  {formatValue(
                    showPercentage ? detail.percentage : detail.value
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 border-t pt-2">
            <div className="flex justify-between gap-4">
              <span className="font-bold">Всего:</span>
              <span className="font-bold">
                {formatValue(
                  showPercentage
                    ? (data.absoluteValue / data.periodTotal) * 100
                    : data.absoluteValue
                )}
              </span>
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
        <div className="mb-2 flex items-center gap-2">
          <div className="text-xl font-bold leading-24 text-black-800">
            Распределение ВБС по срокам просрочки {showPercentage ? ' (%)' : ''}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="!ring-none rounded-full p-2 hover:bg-gray-200">
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
                <Label htmlFor="percentage-mode">Показывать в процентах</Label>
                <Switch
                  id="percentage-mode"
                  checked={showPercentage}
                  onCheckedChange={setShowPercentage}
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Отображаемые продукты</DropdownMenuLabel>
              {productSettings.map((setting) => (
                <DropdownMenuItem
                  key={setting.productName}
                  onSelect={(e) => e.preventDefault()}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id={setting.productName}
                    checked={setting.isVisible}
                    onCheckedChange={() => toggleProduct(setting.productName)}
                  />
                  <label
                    htmlFor={setting.productName}
                    className="flex-1 cursor-pointer"
                    style={{ color: setting.color }}
                  >
                    {setting.productName}
                  </label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ContainerHeader>
      <ContainerBody isScrolling={true} orientation={'horizontal'}>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {pieData.length > 0 && (
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  cornerRadius={3}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, absoluteValue, periodTotal }) =>
                    `${name}: ${formatValue(
                      showPercentage
                        ? (absoluteValue / periodTotal) * 100
                        : absoluteValue
                    )}`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        CONFIG.chartColors[index % CONFIG.chartColors.length]
                      }
                    />
                  ))}
                </Pie>
              )}
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ContainerBody>
    </ContainerComponent>
  )
}

export default AgeingAmountChartModule
