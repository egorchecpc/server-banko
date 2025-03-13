import React, { useState, useMemo, useEffect } from 'react'
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
import {
  ContainerBody,
  ContainerComponent,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import { GearIcon } from '@radix-ui/react-icons'

// Обновленная структура данных
export type ProductData = {
  creditType: string
  product: string | null
  without: number
  between1To30: number
  between31To60: number
  between61To90: number
  moreThen90: number
  products?: ProductData[] | null
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

interface AgeingAmountChartProps {
  amountData: ProductData[]
  countData: ProductData[]
}

const AgeingAmountChartModule: React.FC<AgeingAmountChartProps> = ({
  amountData,
  countData,
}) => {
  const [showPercentage, setShowPercentage] = useState(false)
  const [isAmountMode, setIsAmountMode] = useState(true)
  const [groupByProduct, setGroupByProduct] = useState(false)
  const rawData = isAmountMode ? amountData : countData
  const [productSettings, setProductSettings] = useState<
    {
      productName: string
      isVisible: boolean
      color: string
    }[]
  >([])

  // Преобразуем данные в зависимости от режима группировки
  const data = useMemo(() => {
    if (groupByProduct) {
      // Извлекаем все продукты из структуры данных
      return rawData.flatMap((item) =>
        item.products ? item.products.filter((p) => p.product !== null) : []
      )
    } else {
      // Используем данные верхнего уровня (по типам кредитов)
      return rawData
    }
  }, [rawData, groupByProduct])

  useEffect(() => {
    if (data) {
      // Определяем отображаемые элементы в зависимости от режима группировки
      const displayItems = data.map((item) => ({
        productName: groupByProduct
          ? item.product || 'Неизвестный продукт'
          : item.creditType,
        isVisible: true,
        // Пытаемся получить цвет из конфига или используем запасной вариант
        color:
          CONFIG.colors[
            (groupByProduct
              ? item.product
              : item.creditType) as keyof typeof CONFIG.colors
          ] || '#CCCCCC',
      }))

      // Фильтруем дубликаты, которые могут возникнуть из-за продуктов с одинаковыми именами
      const uniqueItems = displayItems.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.productName === item.productName)
      )

      setProductSettings(uniqueItems)
    }
  }, [data, groupByProduct])

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
    if (!data) return []

    const visibleProducts = productSettings.filter(
      (setting) => setting.isVisible
    )

    if (visibleProducts.length === 0) {
      return []
    }

    const periodMappings = {
      without: 'without',
      '0-30': 'between1To30',
      '30-60': 'between31To60',
      '60-90': 'between61To90',
      '90plus': 'moreThen90',
    }

    const periodTotals: { [key: string]: number } = {}
    const periodDetails: { [key: string]: { [productName: string]: number } } =
      {}

    Object.keys(periodMappings).forEach((period) => {
      periodTotals[period] = 0
      periodDetails[period] = {}
    })

    // Рассчитываем общие суммы для каждого периода по всем данным
    data.forEach((item) => {
      Object.entries(periodMappings).forEach(([oldKey, newKey]) => {
        periodTotals[oldKey] += item[newKey as keyof ProductData] as number
      })
    })

    // Фильтруем видимые элементы и собираем детальную информацию
    visibleProducts.forEach((setting) => {
      const itemData = data.find((p) =>
        groupByProduct
          ? p.product === setting.productName
          : p.creditType === setting.productName
      )

      if (itemData) {
        Object.entries(periodMappings).forEach(([oldKey, newKey]) => {
          periodDetails[oldKey][setting.productName] = itemData[
            newKey as keyof ProductData
          ] as number
        })
      }
    })

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
  }, [data, productSettings, showPercentage, groupByProduct])

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
                      ] || '#666666',
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
        <div className="flex w-full items-center">
          <div className="text-black-1000 text-xl font-bold leading-24">
            Распределение {isAmountMode ? 'ВБС' : 'количества'} по срокам
            просрочки {showPercentage ? ' (%)' : ''}
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
                <Label htmlFor="percentage-mode">Показывать в процентах</Label>
                <Switch
                  id="percentage-mode"
                  checked={showPercentage}
                  onCheckedChange={setShowPercentage}
                />
              </DropdownMenuItem>
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
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                Отображаемые {groupByProduct ? 'продукты' : 'типы кредитов'}
              </DropdownMenuLabel>
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
                  key={groupByProduct ? 'product-view' : 'credit-type-view'} // Используем более надежный ключ
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  animationDuration={700}
                  innerRadius={90}
                  outerRadius={130}
                  paddingAngle={2}
                  cornerRadius={3}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, absoluteValue, periodTotal }) =>
                    `${name}: ${formatValue(showPercentage ? (absoluteValue / periodTotal) * 100 : absoluteValue)}`
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
