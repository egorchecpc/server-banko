import { FC, useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { chartConfig } from '@/modules/TotalAmountOverdueChartModule/TotalAmountOverdueChartConfig'
import {
  ProductSettings,
  YearlyProductData,
  YearlyProductPercentage,
} from '@/models/Amount'
import { GearIcon } from '@radix-ui/react-icons'

interface TotalAmountOverdueChartModuleProps {
  absoluteData: YearlyProductData[]
  percentageData: YearlyProductPercentage[]
}

const formatAmount = (value: number): string => {
  return `${(value / 1000000).toFixed(1)}M ₽`
}

const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

const TotalAmountOverdueChartModule: FC<TotalAmountOverdueChartModuleProps> = ({
  absoluteData,
  percentageData,
}) => {
  const [productSettings, setProductSettings] = useState<ProductSettings[]>([])
  const [showPercentage, setShowPercentage] = useState(false)

  const currentData = showPercentage ? percentageData : absoluteData

  useEffect(() => {
    if (absoluteData.length > 0) {
      const uniqueProducts = Array.from(
        new Set(
          absoluteData.flatMap((yearData) =>
            yearData.products.map((product) => product.productName)
          )
        )
      )

      setProductSettings(
        uniqueProducts.map((productName, index) => ({
          productName,
          isVisible: true,
          color:
            chartConfig.defaultColors[index % chartConfig.defaultColors.length],
        }))
      )
    }
  }, [absoluteData])

  const toggleProduct = (productName: string): void => {
    setProductSettings((prev) =>
      prev.map((setting) =>
        setting.productName === productName
          ? { ...setting, isVisible: !setting.isVisible }
          : setting
      )
    )
  }

  const getValue = (
    item: YearlyProductData | YearlyProductPercentage,
    productName: string
  ): number => {
    if (showPercentage) {
      return (
        (item as YearlyProductPercentage).products.find(
          (p) => p.productName === productName
        )?.percentage || 0
      )
    }
    return (
      (item as YearlyProductData).products.find(
        (p) => p.productName === productName
      )?.amount || 0
    )
  }

  return (
    <ContainerComponent withBg={true}>
      <ContainerHeader>
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold leading-24 text-black-800">
            Динамика задолженности по продуктам {showPercentage ? ' (%)' : ''}
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
        <ResponsiveContainer width="100%" height={chartConfig.height}>
          <LineChart data={currentData} margin={chartConfig.margin}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              tickFormatter={(year: number) => year.toString()}
            />
            <YAxis
              tickFormatter={showPercentage ? formatPercentage : formatAmount}
            />
            <Tooltip
              formatter={(value: number) =>
                showPercentage ? formatPercentage(value) : formatAmount(value)
              }
              labelFormatter={(year: number) => `Год: ${year}`}
            />
            <Legend />
            {productSettings
              .filter((setting) => setting.isVisible)
              .map((setting) => (
                <Line
                  key={setting.productName}
                  type="monotone"
                  dataKey={(item) => getValue(item, setting.productName)}
                  name={setting.productName}
                  stroke={setting.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </ContainerBody>
    </ContainerComponent>
  )
}

export default TotalAmountOverdueChartModule
