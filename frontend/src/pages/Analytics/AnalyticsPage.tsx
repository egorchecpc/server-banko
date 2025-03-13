import { FC, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  ZAxis,
  Scatter,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  ComposedChart,
  Line,
  Legend,
} from 'recharts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { ru } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as ShadcnTooltip,
} from '@/components/ui/tooltip'
// Type definitions
type RiskVariant = 'high-risk' | 'medium-risk' | 'low-risk'

interface RiskSummaryCardProps {
  value: number
  label: string
  percentage: number
  variant?: RiskVariant
}

interface CreditDataChild {
  name: string
  value: number
}

interface CreditDataParent {
  name: string
  value: number
  children: CreditDataChild[]
}

interface CreditDataOuter extends CreditDataChild {
  parentName: string
}

interface DebtorTypeHelper {
  [key: string]: string
}

// Risk Summary Card Component
const RiskSummaryCard: FC<RiskSummaryCardProps> = ({
  value,
  label,
  percentage,
  variant,
}) => {
  // Сохраняем оригинальные ключи с измененными значениями отображения
  const variantStyles: Record<RiskVariant, string> = {
    'high-risk': 'bg-red-100 text-red-800',
    'medium-risk': 'bg-yellow-100 text-yellow-800',
    'low-risk': 'bg-green-100 text-green-800',
  }

  // Функция для получения отображаемого текста стадии
  const getStageText = (variant: string) => {
    switch (variant) {
      case 'low-risk':
        return 'СТАДИЯ 1'
      case 'medium-risk':
        return 'СТАДИЯ 2'
      case 'high-risk':
        return 'СТАДИЯ 3+ POCI'
      default:
        return 'СТАДИЯ'
    }
  }

  return (
    <TooltipProvider>
      <Card className="relative w-full">
        <div className="absolute right-2 top-2 flex items-center gap-1">
          <Badge
            className={`${variant ? variantStyles[variant] : 'bg-blue-100 text-blue-800'}`}
          >
            {variant ? getStageText(variant) : 'СТАДИЯ'}
          </Badge>
          <ShadcnTooltip>
            <TooltipTrigger asChild>
              <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
                i
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Процент резерва на прошлую отчетную дату</p>
            </TooltipContent>
          </ShadcnTooltip>
        </div>
        <CardContent className="pt-6">
          <div className="py-1.5 text-2xl font-bold">
            {value.toLocaleString()} BYN
          </div>
          <div className="text-muted-foreground py-1.5 text-sm">{label}</div>
          <div className="py-1.5 text-xs text-green-600">
            {percentage * 100}% в резерве
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

const monthData2023 = [
  { period: 'Январь', vbs: 9.1, oky: 7.3 },
  { period: 'Февраль', vbs: 9.3, oky: 7.4 },
  { period: 'Март', vbs: 9.5, oky: 7.5 },
  { period: 'Апрель', vbs: 10.0, oky: 7.6 },
  { period: 'Май', vbs: 10.3, oky: 7.7 },
  { period: 'Июнь', vbs: 10.8, oky: 7.9 },
  { period: 'Июль', vbs: 11.0, oky: 8.0 },
  { period: 'Август', vbs: 11.1, oky: 8.1 },
  { period: 'Сентябрь', vbs: 11.2, oky: 8.2 },
  { period: 'Октябрь', vbs: 12.0, oky: 8.3 },
  { period: 'Ноябрь', vbs: 13.0, oky: 8.4 },
  { period: 'Декабрь', vbs: 13.8, oky: 8.5 },
]

const monthData2022 = [
  { period: 'Январь', vbs: 8.7, oky: 7.0 },
  { period: 'Февраль', vbs: 8.9, oky: 7.1 },
  { period: 'Март', vbs: 9.0, oky: 7.2 },
  { period: 'Апрель', vbs: 9.2, oky: 7.3 },
  { period: 'Май', vbs: 9.3, oky: 7.35 },
  { period: 'Июнь', vbs: 9.4, oky: 7.4 },
  { period: 'Июль', vbs: 9.6, oky: 7.45 },
  { period: 'Август', vbs: 9.7, oky: 7.5 },
  { period: 'Сентябрь', vbs: 9.8, oky: 7.55 },
  { period: 'Октябрь', vbs: 10.0, oky: 7.6 },
  { period: 'Ноябрь', vbs: 10.1, oky: 7.65 },
  { period: 'Декабрь', vbs: 10.2, oky: 7.7 },
]

// Данные для кварталов (2023)
const quarterData2023 = [
  { period: 'Q4 2022', vbs: 9.3, oky: 7.2 },
  { period: 'Q1 2023', vbs: 9.8, oky: 7.6 },
  { period: 'Q2 2023', vbs: 10.5, oky: 7.8 },
  { period: 'Q3 2023', vbs: 11.5, oky: 8.0 },
  { period: 'Q4 2023', vbs: 13.2, oky: 8.3 },
]

// Данные для кварталов (2022)
const quarterData2022 = [
  { period: 'Q4 2021', vbs: 8.5, oky: 6.9 },
  { period: 'Q1 2022', vbs: 8.8, oky: 7.1 },
  { period: 'Q2 2022', vbs: 9.2, oky: 7.3 },
  { period: 'Q3 2022', vbs: 9.6, oky: 7.4 },
  { period: 'Q4 2022', vbs: 10.0, oky: 7.6 },
]

// Данные для годов
const yearData = [
  { period: '2019', vbs: 8.0, oky: 6.2 },
  { period: '2020', vbs: 8.5, oky: 6.8 },
  { period: '2021', vbs: 9.2, oky: 7.2 },
  { period: '2022', vbs: 10.2, oky: 7.7 },
  { period: '2023', vbs: 13.8, oky: 8.5 },
]

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<any>
}

const VbsChart = () => {
  const [timeframe, setTimeframe] = useState('Month')
  const [selectedTimeframe, setSelectedTimeframe] = useState('Месяц')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      date: new Date('2023-12-31'),
    },
  })

  const handleDateSelect = (date, field) => {
    field.onChange(date)
    setIsCalendarOpen(false)
  }

  const getData = () => {
    const year = form.getValues().date.getFullYear()

    // Выбор набора данных в зависимости от временного периода и года
    switch (timeframe) {
      case 'Quarter':
        return year === 2023 ? quarterData2023 : quarterData2022
      case 'Year':
        return yearData
      default: // Month
        return year === 2023 ? monthData2023 : monthData2022
    }
  }

  const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded border bg-white p-4 shadow-lg">
          <p className="font-bold">Дата: {payload[0].payload.period}</p>
          <p>ВБС (по выбранной метрике): {payload[0].value.toFixed(2)} млн</p>
          <p>ОКУ (по выбранной метрике): {payload[1].value.toFixed(2)} млн</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <Card className="h-96 w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold leading-38 text-black-900">
                ВБС розничного кредитного портфеля
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Form {...form}>
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="mb-0 flex items-center gap-2">
                        <FormLabel className="whitespace-nowrap text-gray-500">
                          Дата:
                        </FormLabel>
                        <Popover
                          open={isCalendarOpen}
                          onOpenChange={setIsCalendarOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'h-10 pl-3 text-left font-normal'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'd MMMM yyyy', {
                                    locale: ru,
                                  })
                                ) : (
                                  <span>Выберите дату</span>
                                )}
                                <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent
                            side="bottom"
                            align="start"
                            className="mx-auto w-auto p-0"
                          >
                            <Calendar
                              mode="single"
                              locale={ru}
                              captionLayout="dropdown-buttons"
                              selected={field.value}
                              defaultMonth={field.value}
                              onSelect={(date) => handleDateSelect(date, field)}
                              fromYear={2020}
                              toYear={2025}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date('2020-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  <Select
                    value={timeframe}
                    onValueChange={(value) => {
                      setTimeframe(value)
                      setSelectedTimeframe(
                        value === 'Month'
                          ? 'Месяц'
                          : value === 'Quarter'
                            ? 'Квартал'
                            : 'Год'
                      )
                    }}
                  >
                    <SelectTrigger className="h-10 w-[180px]">
                      <SelectValue>{selectedTimeframe}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Month">Месяц</SelectItem>
                      <SelectItem value="Quarter">Квартал</SelectItem>
                      <SelectItem value="Year">Год</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Form>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-full">
          <ResponsiveContainer width="100%" height="85%" className="py-1.5">
            <ComposedChart
              data={getData()}
              barSize={30}
              margin={{ left: 20, right: 20, top: 12, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis
                yAxisId="left"
                domain={[0, 'dataMax + 1']}
                label={{
                  value: 'ВБС',
                  angle: -90,
                  position: 'insideLeft',
                }}
                tickFormatter={(tick) => `${tick.toFixed(2)} млн`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 'dataMax + 1']}
                tickFormatter={(tick) => `${tick.toFixed(2)} млн`}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
              <Bar
                dataKey="vbs"
                fill="#5CD9C9"
                yAxisId="left"
                className="hover:fill-opacity-70 transition-all"
              />
              <Line
                type="monotone"
                dataKey="oky"
                stroke="#1E88F5"
                yAxisId="right"
                strokeWidth={2}
                dot={{ fill: '#1E88F5', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

interface CreditItem {
  id: string
  clientId: string
  currency: string
  ownerType: string
  product: string
  creditType: string
  stage: string
  date: string
  loanRepaymentDate: string
  grossCarryingAmount: number
  lgd: number
  prepaymentRate: number
  expectedCreditLossesAmount: number
  reservationPercentage: number
  mpd: number
}

interface ProductSummary {
  product: string
  totalExpectedCreditLossesAmount: number
}

const RiskyAssets: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('byClient')

  // Пример данных из вашего JSON
  const creditItems: CreditItem[] = [
    {
      id: '111111',
      clientId: '225928',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Ипотека 20 лет',
      creditType: 'Ипотечные кредиты',
      stage: '1',
      date: '2022-10-15',
      loanRepaymentDate: '2025-11-14',
      grossCarryingAmount: 139042.11,
      lgd: 65.2477,
      prepaymentRate: 0.04,
      expectedCreditLossesAmount: 3574.18,
      reservationPercentage: 0.0257,
      mpd: 0.0038,
    },
    {
      id: '111111',
      clientId: '486174',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Ипотека 20 лет',
      creditType: 'Ипотечные кредиты',
      stage: '1',
      date: '2022-10-15',
      loanRepaymentDate: '2025-11-14',
      grossCarryingAmount: 84391.93,
      lgd: 65.2477,
      prepaymentRate: 0.04,
      expectedCreditLossesAmount: 2153.04,
      reservationPercentage: 0.0255,
      mpd: 0.0038,
    },
    {
      id: '2881654',
      clientId: '285301',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'На исполнение желаний',
      creditType: 'Потребительские кредиты',
      stage: '3',
      date: '2021-05-01',
      loanRepaymentDate: '2025-04-30',
      grossCarryingAmount: 35188.65,
      lgd: 91.7553,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 32287.44,
      reservationPercentage: 0.9176,
      mpd: 1.0,
    },
    {
      id: '2881654',
      clientId: '759471',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'На исполнение желаний',
      creditType: 'Потребительские кредиты',
      stage: '3',
      date: '2021-05-01',
      loanRepaymentDate: '2025-04-30',
      grossCarryingAmount: 31561.67,
      lgd: 65.2477,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 20593.27,
      reservationPercentage: 0.6525,
      mpd: 1.0,
    },
    {
      id: '2479613',
      clientId: '153617',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Овердрафт 30 дней',
      creditType: 'Овердрафт',
      stage: '3',
      date: '2022-02-03',
      loanRepaymentDate: '2024-02-02',
      grossCarryingAmount: 4253.76,
      lgd: 91.7553,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 3903.05,
      reservationPercentage: 0.9176,
      mpd: 1.0,
    },
    {
      id: '148128727',
      clientId: '921009',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'На самое важное',
      creditType: 'Потребительские кредиты',
      stage: '1',
      date: '2022-12-30',
      loanRepaymentDate: '2025-12-29',
      grossCarryingAmount: 3936.44,
      lgd: 65.2477,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 101.38,
      reservationPercentage: 0.0258,
      mpd: 0.0038,
    },
    {
      id: '2479613',
      clientId: '923858',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Овердрафт 30 дней',
      creditType: 'Овердрафт',
      stage: '3',
      date: '2022-02-03',
      loanRepaymentDate: '2024-02-02',
      grossCarryingAmount: 3359.83,
      lgd: 65.2477,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 2192.21,
      reservationPercentage: 0.6525,
      mpd: 1.0,
    },
    {
      id: '148128727',
      clientId: '684378',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'На самое важное',
      creditType: 'Потребительские кредиты',
      stage: '2',
      date: '2022-12-30',
      loanRepaymentDate: '2025-12-29',
      grossCarryingAmount: 2987.59,
      lgd: 65.2477,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 1780.93,
      reservationPercentage: 0.5961,
      mpd: 0.0967,
    },
    {
      id: '5112587',
      clientId: '876935',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Ипотека 15 лет',
      creditType: 'Ипотечные кредиты',
      stage: '1',
      date: '2022-09-08',
      loanRepaymentDate: '2037-09-07',
      grossCarryingAmount: 2943.35,
      lgd: 65.2477,
      prepaymentRate: 0.04,
      expectedCreditLossesAmount: 70.6,
      reservationPercentage: 0.024,
      mpd: 0.0038,
    },
    {
      id: '6568318',
      clientId: '128616',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Ипотека 15 лет',
      creditType: 'Ипотечные кредиты',
      stage: '2',
      date: '2021-07-30',
      loanRepaymentDate: '2031-07-29',
      grossCarryingAmount: 2871.46,
      lgd: 65.2477,
      prepaymentRate: 0.04,
      expectedCreditLossesAmount: 965.16,
      reservationPercentage: 0.3361,
      mpd: 0.0156,
    },
  ]

  // Сортировка по ВБС (expectedCreditLossesAmount) в убывающем порядке
  const sortedByLosses = [...creditItems].sort(
    (a, b) => b.expectedCreditLossesAmount - a.expectedCreditLossesAmount
  )

  // Группировка по продуктам
  const productSummary: ProductSummary[] = []
  creditItems.forEach((item) => {
    const existingProduct = productSummary.find(
      (p) => p.product === item.product
    )
    if (existingProduct) {
      existingProduct.totalExpectedCreditLossesAmount +=
        item.expectedCreditLossesAmount
    } else {
      productSummary.push({
        product: item.product,
        totalExpectedCreditLossesAmount: item.expectedCreditLossesAmount,
      })
    }
  })

  // Сортировка продуктов по общей сумме ВБС в убывающем порядке
  const sortedProducts = productSummary.sort(
    (a, b) =>
      b.totalExpectedCreditLossesAmount - a.totalExpectedCreditLossesAmount
  )

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <div className="text-xl font-bold leading-38 text-black-900">
          Самые рисковые активы
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="byClient" onValueChange={setActiveTab}>
          <TabsList className="mb-4 flex w-full justify-around">
            <TabsTrigger value="byClient">По клиентам</TabsTrigger>
            <TabsTrigger value="byProduct">По продуктам</TabsTrigger>
          </TabsList>

          <TabsContent value="byClient" className="mt-0">
            <div className="h-[213px] overflow-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      ID клиента
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      Вид продукта
                    </th>
                    <th className="p-2 text-right text-sm font-medium text-gray-700">
                      ВБС
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedByLosses.slice(0, 10).map((item, index) => (
                    <tr
                      key={`${item.clientId}-${index}`}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="p-2 text-sm text-gray-700">
                        {item.clientId}
                      </td>
                      <td className="p-2 text-sm text-gray-700">
                        {item.product}
                      </td>
                      <td className="p-2 text-right text-sm text-gray-700">
                        {item.expectedCreditLossesAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="byProduct" className="mt-0">
            <div className="h-[213px] overflow-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      Вид продукта
                    </th>
                    <th className="p-2 text-right text-sm font-medium text-gray-700">
                      Общая ВБС
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((product, index) => (
                    <tr
                      key={`${product.product}-${index}`}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="p-2 text-sm text-gray-700">
                        {product.product}
                      </td>
                      <td className="p-2 text-right text-sm text-gray-700">
                        {product.totalExpectedCreditLossesAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Risk Scatter Plot Component
const TopRiskyLoansChart = () => {
  // Исходные данные из предоставленного JSON
  const rawData = [
    {
      id: '111111',
      clientId: '225928',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Ипотека 20 лет',
      creditType: 'Ипотечные кредиты',
      stage: '1',
      date: '2022-10-15',
      loanRepaymentDate: '2025-11-14',
      grossCarryingAmount: 139042.11,
      lgd: 65.2477,
      prepaymentRate: 0.04,
      expectedCreditLossesAmount: 3574.18,
      reservationPercentage: 0.0257,
      mpd: 0.0038,
    },
    {
      id: '111111',
      clientId: '486174',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Ипотека 20 лет',
      creditType: 'Ипотечные кредиты',
      stage: '1',
      date: '2022-10-15',
      loanRepaymentDate: '2025-11-14',
      grossCarryingAmount: 84391.93,
      lgd: 65.2477,
      prepaymentRate: 0.04,
      expectedCreditLossesAmount: 2153.04,
      reservationPercentage: 0.0255,
      mpd: 0.0038,
    },
    {
      id: '2881654',
      clientId: '285301',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'На исполнение желаний',
      creditType: 'Потребительские кредиты',
      stage: '3',
      date: '2021-05-01',
      loanRepaymentDate: '2025-04-30',
      grossCarryingAmount: 35188.65,
      lgd: 91.7553,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 32287.44,
      reservationPercentage: 0.9176,
      mpd: 1.0,
    },
    {
      id: '2881654',
      clientId: '759471',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'На исполнение желаний',
      creditType: 'Потребительские кредиты',
      stage: '3',
      date: '2021-05-01',
      loanRepaymentDate: '2025-04-30',
      grossCarryingAmount: 31561.67,
      lgd: 65.2477,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 20593.27,
      reservationPercentage: 0.6525,
      mpd: 1.0,
    },
    {
      id: '2479613',
      clientId: '153617',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Овердрафт 30 дней',
      creditType: 'Овердрафт',
      stage: '3',
      date: '2022-02-03',
      loanRepaymentDate: '2024-02-02',
      grossCarryingAmount: 4253.76,
      lgd: 91.7553,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 3903.05,
      reservationPercentage: 0.9176,
      mpd: 1.0,
    },
    {
      id: '148128727',
      clientId: '921009',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'На самое важное',
      creditType: 'Потребительские кредиты',
      stage: '1',
      date: '2022-12-30',
      loanRepaymentDate: '2025-12-29',
      grossCarryingAmount: 3936.44,
      lgd: 65.2477,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 101.38,
      reservationPercentage: 0.0258,
      mpd: 0.0038,
    },
    {
      id: '2479613',
      clientId: '923858',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Овердрафт 30 дней',
      creditType: 'Овердрафт',
      stage: '3',
      date: '2022-02-03',
      loanRepaymentDate: '2024-02-02',
      grossCarryingAmount: 3359.83,
      lgd: 65.2477,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 2192.21,
      reservationPercentage: 0.6525,
      mpd: 1.0,
    },
    {
      id: '148128727',
      clientId: '684378',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'На самое важное',
      creditType: 'Потребительские кредиты',
      stage: '2',
      date: '2022-12-30',
      loanRepaymentDate: '2025-12-29',
      grossCarryingAmount: 2987.59,
      lgd: 65.2477,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 1780.93,
      reservationPercentage: 0.5961,
      mpd: 0.0967,
    },
    {
      id: '5112587',
      clientId: '876935',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Ипотека 15 лет',
      creditType: 'Ипотечные кредиты',
      stage: '1',
      date: '2022-09-08',
      loanRepaymentDate: '2037-09-07',
      grossCarryingAmount: 2943.35,
      lgd: 65.2477,
      prepaymentRate: 0.04,
      expectedCreditLossesAmount: 70.6,
      reservationPercentage: 0.024,
      mpd: 0.0038,
    },
    {
      id: '6568318',
      clientId: '128616',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Ипотека 15 лет',
      creditType: 'Ипотечные кредиты',
      stage: '2',
      date: '2021-07-30',
      loanRepaymentDate: '2031-07-29',
      grossCarryingAmount: 2871.46,
      lgd: 65.2477,
      prepaymentRate: 0.04,
      expectedCreditLossesAmount: 965.16,
      reservationPercentage: 0.3361,
      mpd: 0.0156,
    },
  ]

  // Обработка данных
  const processedData = rawData.map((item) => ({
    id: item.id,
    clientId: item.clientId,
    product: item.product,
    creditType: item.creditType,
    stage: item.stage,
    x: item.grossCarryingAmount, // ВБС для оси X
    y: item.grossCarryingAmount * (item.lgd / 100), // ВБС * LGD для оси Y
    lgd: item.lgd,
    expectedCreditLossesAmount: item.expectedCreditLossesAmount,
    reservationPercentage: item.reservationPercentage,
    size: item.stage === '3' ? 100 : item.stage === '2' ? 70 : 40, // Размер точки зависит от стадии кредита
    color:
      item.stage === '3'
        ? '#ef4444'
        : item.stage === '2'
          ? '#f59e0b'
          : '#10b981', // Цвет зависит от стадии
  }))

  // Сортировка по ВБС (grossCarryingAmount) в порядке убывания
  const sortedData = [...processedData].sort((a, b) => b.x - a.x)

  // Берем только топ-10
  const top10Data = sortedData.slice(0, 10)

  interface CustomTooltipProps {
    active?: boolean
    payload?: Array<any>
  }

  // Кастомный тултип с детальной информацией
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded border bg-white p-4 shadow-lg">
          <p className="text-lg font-bold">ID кредита: {data.id}</p>
          <p>ID клиента: {data.clientId}</p>
          <p>Продукт: {data.product}</p>
          <p>Тип кредита: {data.creditType}</p>
          <p>Стадия: {data.stage}</p>
          <p className="font-medium">ВБС: {data.x.toLocaleString()} BYN</p>
          <p className="font-medium">LGD: {data.lgd.toFixed(2)}%</p>
          <p className="font-medium">
            ВБС × LGD: {data.y.toLocaleString()} BYN
          </p>
          <p>ОКУ: {data.expectedCreditLossesAmount.toLocaleString()} BYN</p>
          <p>
            Процент резервирования:{' '}
            {(data.reservationPercentage * 100).toFixed(2)}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="h-[550px] w-full">
      <CardHeader>
        <div className="text-xl font-bold text-black-900">
          Топ-10 кредитов с наибольшим ВБС
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <ResponsiveContainer width="100%" height="85%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name="ВБС"
              domain={['dataMin - 5000', 'dataMax + 5000']}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)} тыс.`}
              label={{ value: 'ВБС (BYN)', position: 'bottom', offset: 20 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="ВБС × LGD"
              domain={['dataMin - 5000', 'dataMax + 5000']}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)} тыс.`}
              label={{
                value: 'ВБС × LGD (BYN)',
                angle: -90,
                position: 'left',
                offset: 15,
              }}
            />
            <ZAxis type="number" dataKey="size" range={[40, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              payload={[
                {
                  value: 'Стадия 1 (Низкий риск)',
                  type: 'circle',
                  color: '#10b981',
                },
                {
                  value: 'Стадия 2 (Средний риск)',
                  type: 'circle',
                  color: '#f59e0b',
                },
                {
                  value: 'Стадия 3 (Высокий риск)',
                  type: 'circle',
                  color: '#ef4444',
                },
              ]}
            />
            {top10Data.map((entry, index) => (
              <Scatter
                key={index}
                name={`Кредит ${index + 1}`}
                data={[entry]}
                fill={entry.color}
                fillOpacity={0.7}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface PieItemProps {
  name: string
  percent: number
  parentName?: string
}

const CreditTypesSunburstChart: React.FC = () => {
  const creditData: CreditDataParent[] = [
    {
      name: 'Потребительский',
      value: 75,
      children: [
        { name: 'На путешествия', value: 25 },
        { name: 'На самое важное', value: 25 },
        { name: 'На исполнение желаний', value: 25 },
      ],
    },
    {
      name: 'Ипотечный',
      value: 60,
      children: [
        { name: 'Ипотека 15 лет', value: 10 },
        { name: 'Ипотека 10 лет', value: 20 },
        { name: 'Ипотека 20 лет', value: 30 },
      ],
    },
    {
      name: 'Овердрафт',
      value: 30,
      children: [
        { name: 'Овердрафт 30 дней', value: 20 },
        { name: 'Овердрафт 100 дней', value: 10 },
      ],
    },
    {
      name: 'Кредитные карты',
      value: 30,
      children: [
        { name: 'Гибкий лимит', value: 6 },
        { name: 'Кредитный кошелек', value: 11 },
        { name: 'До зарплаты', value: 13 },
      ],
    },
  ]

  // Flatten the data for the outer ring
  const outerData: CreditDataOuter[] = creditData.flatMap((parent) =>
    parent.children.map((child) => ({
      ...child,
      parentName: parent.name,
    }))
  )

  // Color palettes
  const COLORS_INNER: string[] = [
    '#1e90ff', // Dodger Blue
    '#4169e1', // Royal Blue
    '#0000cd', // Medium Blue
    '#00008b', // Dark Blue
  ]
  const COLORS_OUTER: string[] = [
    '#87cefa', // Light Sky Blue
    '#87ceeb', // Sky Blue
    '#6495ed', // Cornflower Blue
    '#4682b4', // Steel Blue
    '#5f9ea0', // Cadet Blue
    '#4169e1', // Royal Blue
    '#0080ff', // Azure
    '#1e4d8c', // Dark Slate Blue
  ]

  // Custom label for inner ring
  const renderInnerLabel = ({ name, percent }: PieItemProps) => {
    return (
      <text
        x={0}
        y={0}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
      >
        {`${name}\n${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  // Custom label for outer ring
  const renderOuterLabel = ({ name, percent, parentName }: PieItemProps) => {
    return `${parentName}: ${name} (${(percent * 100).toFixed(0)}%)`
  }

  return (
    <Card className="h-[550px] w-full space-y-4">
      <CardHeader>
        <div className="text-xl font-bold leading-38 text-black-900">
          Диаграмма кредитных рисков
        </div>
      </CardHeader>
      <div className="relative h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Inner Ring (Credit Types) */}
            <Pie
              data={creditData}
              dataKey="value"
              nameKey="name"
              startAngle={90}
              endAngle={-270}
              innerRadius={0}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={2}
              label={renderInnerLabel}
              labelLine={false}
            >
              {creditData.map((entry, index) => (
                <Cell
                  key={`inner-${index}`}
                  fill={COLORS_INNER[index % COLORS_INNER.length]}
                />
              ))}
            </Pie>

            {/* Outer Ring (Product Types) */}
            <Pie
              data={outerData}
              dataKey="value"
              nameKey="name"
              startAngle={90}
              endAngle={-270}
              innerRadius={110}
              outerRadius={170}
              fill="#82ca9d"
              paddingAngle={2}
              label={renderOuterLabel}
              labelLine={true}
            >
              {outerData.map((entry, index) => (
                <Cell
                  key={`outer-${index}`}
                  fill={COLORS_OUTER[index % COLORS_OUTER.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name, props) => [
                value,
                `${props.payload.parentName ? props.payload.parentName + ' - ' : ''}${name}`,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

const debtorTypeHelper: DebtorTypeHelper = {
  retail: 'розничных',
  corporate: 'корпоративных',
  interbank: 'межбанковских',
  sovereign: 'суверенных',
}

const FinancialDashboard: React.FC = () => {
  const search = useSearch<{ type: string }>({
    strict: false,
  })
  const navigate = useNavigate()
  const handleContinue = () => {
    navigate({ to: '/reports', search: { type: search.type } })
  }
  return (
    <div className="h-full w-full space-y-6 p-6">
      <div className="flex items-center justify-between px-1.5">
        <Link to="/apps" className="flex items-center">
          <div className="text-2xl font-bold leading-38 text-black-900">
            Аналитика по портфелю {debtorTypeHelper[search.type]} кредитов
          </div>
        </Link>
        <Button variant={'primary'} onClick={handleContinue}>
          Перейти к отчётам
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <RiskSummaryCard
          value={363197.62}
          label="Общая сумма розничных кредитов в стадии I"
          percentage={(0.272).toFixed(2)}
          variant="low-risk"
        />
        <RiskSummaryCard
          value={16140.27}
          label="Общая сумма розничных кредитов в стадии II"
          percentage={(0.452).toFixed(2)}
          variant="medium-risk"
        />
        <RiskSummaryCard
          value={43037.33}
          label="Общая сумма розничных кредитов в стадии III + POCI"
          percentage={(0.908).toFixed(2)}
          variant="high-risk"
        />
      </div>
      <div className="mb-6"></div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <VbsChart />
        </div>
        <div className="col-span-3 mb-3">
          <RiskyAssets />
        </div>
      </div>
      <div className="!mb-[80px] grid grid-cols-2 gap-6">
        <CreditTypesSunburstChart />
        <TopRiskyLoansChart />
      </div>
    </div>
  )
}

export default FinancialDashboard
