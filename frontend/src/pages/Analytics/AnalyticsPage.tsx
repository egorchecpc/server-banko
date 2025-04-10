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
import { useNavigate, useSearch } from '@tanstack/react-router'
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
import { CalendarIcon, CircleAlert } from 'lucide-react'
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
    'high-risk': 'bg-red-200 text-red-800',
    'medium-risk': 'bg-yellow-200 text-yellow-800',
    'low-risk': 'bg-green-200 text-green-800',
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
        <div className="absolute right-3 top-3">
          {' '}
          {/* Изменено с right-2 top-2 на right-3 top-3 */}
          <Badge
            className={`flex items-center justify-center px-2 py-1 ${variant ? variantStyles[variant] : 'bg-blue-100 text-blue-800'}`}
            /* Добавлены классы px-2 py-1 для увеличения внутренних отступов
             * и flex items-center justify-center для центрирования текста */
          >
            {variant ? getStageText(variant) : 'СТАДИЯ'}
          </Badge>
        </div>
        <CardContent className="pt-6">
          <div className="py-1.5 text-2xl font-bold text-black-1000">
            {value.toLocaleString()} BYN
          </div>
          <div className="text-muted-foreground py-1.5 text-sm text-black-1000">
            {label}
          </div>
          <div className="flex items-center gap-1">
            <div className="py-1.5 text-xs text-green-600">
              {percentage * 100}% в резерве
            </div>
            <ShadcnTooltip>
              <TooltipTrigger asChild>
                <div className="flex h-5 w-5 cursor-pointer items-center justify-center">
                  <CircleAlert className="h-3.5 w-3.5 text-gray-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Процент резерва на прошлую отчетную дату</p>
              </TooltipContent>
            </ShadcnTooltip>
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

  // Исправленный обработчик handleDateSelect
  const handleDateSelect = (date, field) => {
    // Если дата выбрана, создаем новый объект Date, сохраняя исходное значение
    if (date) {
      // Сохраняем год, месяц и день из выбранной даты
      const selectedYear = date.getFullYear()
      const selectedMonth = date.getMonth()
      const selectedDay = date.getDate()

      // Создаем новый объект даты с теми же значениями
      field.onChange(new Date(selectedYear, selectedMonth, selectedDay))
    } else {
      field.onChange(date)
    }
    setIsCalendarOpen(false)
  }

  // Исправленная функция getData
  const getData = () => {
    const formDate = form.getValues().date

    // Проверка наличия даты перед использованием
    if (!formDate) {
      console.log('Дата не выбрана')
      return timeframe === 'Year'
        ? yearData
        : timeframe === 'Quarter'
          ? quarterData2023
          : monthData2023 // Возвращаем данные по умолчанию вместо пустого массива
    }

    const year = formDate.getFullYear()
    console.log('Получаем данные для года:', year, 'timeframe:', timeframe)

    // Остальной код без изменений
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
              <div className="text-xl font-bold leading-38 text-black-1000">
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
                                  'h-10 pl-3 text-left font-normal text-black-1000'
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
                              toYear={2032}
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
                    className="text-black-1000"
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
                      <SelectItem value="Month" className="text-black-1000">
                        Месяц
                      </SelectItem>
                      <SelectItem value="Quarter" className="text-black-1000">
                        Квартал
                      </SelectItem>
                      <SelectItem value="Year" className="text-black-1000">
                        Год
                      </SelectItem>
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
                fill="#6940d1"
                yAxisId="left"
                className="hover:fill-opacity-70 transition-all"
              />
              <Line
                type="monotone"
                dataKey="oky"
                stroke="#dbd5f9"
                yAxisId="right"
                strokeWidth={2}
                dot={{ fill: '#bdaff9', r: 4 }}
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
        <div className="text-xl font-bold leading-38 text-black-1000">
          Самые рисковые активы
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="byClient" onValueChange={setActiveTab}>
          <TabsList className="mb-4 flex w-full justify-around">
            <TabsTrigger value="byClient" className="text-black-1000">
              По клиентам
            </TabsTrigger>
            <TabsTrigger value="byProduct" className="text-black-1000">
              По продуктам
            </TabsTrigger>
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
                      <td className="p-2 text-sm font-medium text-black-1000">
                        {item.clientId}
                      </td>
                      <td className="p-2 text-sm font-medium text-black-1000">
                        {item.product}
                      </td>
                      <td className="p-2 text-right text-sm font-medium text-black-1000">
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
  // Исходные данные из предоставленного JSON с добавленными записями
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
      id: '111112',
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
      id: '2881655',
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
      id: '2479614',
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
      id: '148128728',
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
    // Добавленные записи
    {
      id: '8754321',
      clientId: '345678',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Автокредит 7 лет',
      creditType: 'Автокредиты',
      stage: '2',
      date: '2022-11-20',
      loanRepaymentDate: '2029-11-19',
      grossCarryingAmount: 65432.56,
      lgd: 72.5,
      prepaymentRate: 0.03,
      expectedCreditLossesAmount: 19824.56,
      reservationPercentage: 0.303,
      mpd: 0.0427,
    },
    {
      id: '9876543',
      clientId: '456789',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Бизнес-старт',
      creditType: 'Бизнес-кредиты',
      stage: '3',
      date: '2021-06-15',
      loanRepaymentDate: '2026-06-14',
      grossCarryingAmount: 54321.78,
      lgd: 88.4,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 48000.45,
      reservationPercentage: 0.884,
      mpd: 1.0,
    },
    {
      id: '7531594',
      clientId: '567890',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Ремонт квартиры',
      creditType: 'Потребительские кредиты',
      stage: '1',
      date: '2023-01-10',
      loanRepaymentDate: '2027-01-09',
      grossCarryingAmount: 22345.67,
      lgd: 58.7,
      prepaymentRate: 0.02,
      expectedCreditLossesAmount: 542.86,
      reservationPercentage: 0.0243,
      mpd: 0.0038,
    },
    {
      id: '9513578',
      clientId: '678901',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Образование',
      creditType: 'Потребительские кредиты',
      stage: '2',
      date: '2022-08-22',
      loanRepaymentDate: '2025-08-21',
      grossCarryingAmount: 17654.32,
      lgd: 69.3,
      prepaymentRate: 0.02,
      expectedCreditLossesAmount: 7283.45,
      reservationPercentage: 0.4125,
      mpd: 0.0634,
    },
    {
      id: '1597532',
      clientId: '789012',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Свадебный',
      creditType: 'Потребительские кредиты',
      stage: '3',
      date: '2021-09-05',
      loanRepaymentDate: '2024-09-04',
      grossCarryingAmount: 12567.89,
      lgd: 94.8,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 11914.36,
      reservationPercentage: 0.948,
      mpd: 1.0,
    },
    {
      id: '7539514',
      clientId: '890123',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Коммерческая недвижимость',
      creditType: 'Бизнес-кредиты',
      stage: '1',
      date: '2022-12-15',
      loanRepaymentDate: '2032-12-14',
      grossCarryingAmount: 110456.78,
      lgd: 61.4,
      prepaymentRate: 0.05,
      expectedCreditLossesAmount: 2780.45,
      reservationPercentage: 0.0252,
      mpd: 0.0041,
    },
    {
      id: '3579510',
      clientId: '901234',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Развитие бизнеса',
      creditType: 'Бизнес-кредиты',
      stage: '2',
      date: '2022-07-18',
      loanRepaymentDate: '2027-07-17',
      grossCarryingAmount: 45678.9,
      lgd: 76.2,
      prepaymentRate: 0.02,
      expectedCreditLossesAmount: 20876.54,
      reservationPercentage: 0.4571,
      mpd: 0.0624,
    },
    {
      id: '5791532',
      clientId: '012345',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Экспресс-кредит',
      creditType: 'Потребительские кредиты',
      stage: '3',
      date: '2022-03-10',
      loanRepaymentDate: '2024-03-09',
      grossCarryingAmount: 7345.67,
      lgd: 89.6,
      prepaymentRate: 0.01,
      expectedCreditLossesAmount: 6581.72,
      reservationPercentage: 0.896,
      mpd: 1.0,
    },
    {
      id: '1537952',
      clientId: '123456',
      currency: 'BYN',
      ownerType: 'Розничный',
      product: 'Овердрафт 60 дней',
      creditType: 'Овердрафт',
      stage: '1',
      date: '2023-02-01',
      loanRepaymentDate: '2024-01-31',
      grossCarryingAmount: 5432.1,
      lgd: 62.8,
      prepaymentRate: 0.03,
      expectedCreditLossesAmount: 139.32,
      reservationPercentage: 0.0257,
      mpd: 0.0041,
    },
  ]

  // Обработка данных с разнесением точек для избежания перекрытия
  const processedData = rawData.map((item, index) => {
    // Добавляем небольшое смещение к LGD для разнесения точек
    const lgdOffset = index % 3 === 0 ? -2 : index % 3 === 1 ? 2 : 0

    // Небольшое случайное смещение для grossCarryingAmount
    const amountOffset =
      index % 4 === 0
        ? 0
        : index % 4 === 1
          ? 2000
          : index % 4 === 2
            ? -1500
            : 1000

    return {
      id: item.id,
      clientId: item.clientId,
      product: item.product,
      creditType: item.creditType,
      stage: item.stage,
      x: item.grossCarryingAmount + amountOffset, // ВБС для оси X с небольшим смещением
      y:
        (item.grossCarryingAmount + amountOffset) *
        ((item.lgd + lgdOffset) / 100), // ВБС * LGD для оси Y с учетом смещения
      lgd: item.lgd + lgdOffset,
      expectedCreditLossesAmount: item.expectedCreditLossesAmount,
      reservationPercentage: item.reservationPercentage,
      // Увеличили размеры точек
      size: item.stage === '3' ? 150 : item.stage === '2' ? 120 : 90, // Увеличенный размер точек
      strokeWidth: 2, // Добавляем обводку для более заметного отображения
      color:
        item.stage === '3'
          ? '#ef4444'
          : item.stage === '2'
            ? '#f59e0b'
            : '#10b981', // Цвет зависит от стадии
    }
  })

  // Сортировка по ВБС (grossCarryingAmount) в порядке убывания
  const sortedData = [...processedData].sort((a, b) => b.x - a.x)

  // Берем только топ-15 (увеличили количество отображаемых точек)
  const topData = sortedData.slice(0, 15)

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
        <div className="text-xl font-bold text-black-1000">
          Топ-15 кредитов с наибольшим ВБС
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
              domain={['dataMin - 10000', 'dataMax + 10000']}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)} тыс.`}
              label={{ value: 'ВБС (BYN)', position: 'bottom', offset: 20 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="ВБС × LGD"
              domain={['dataMin - 10000', 'dataMax + 10000']}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)} тыс.`}
              label={{
                value: 'ВБС × LGD (BYN)',
                angle: -90,
                position: 'left',
                offset: 15,
              }}
            />
            <ZAxis type="number" dataKey="size" range={[90, 150]} />
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
            {topData.map((entry, index) => (
              <Scatter
                key={index}
                name={`Кредит ${index + 1}`}
                data={[entry]}
                fill={entry.color}
                fillOpacity={0.8}
                strokeWidth={entry.strokeWidth}
                stroke="#000"
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface CreditData {
  name: string
  value: number
}

interface CreditDataParent extends CreditData {
  children: CreditData[]
}

interface CreditDataOuter extends CreditData {
  parentName: string
}

interface PieItemProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
  name: string
  fill: string
  parentName?: string
}

const CreditTypesSunburstChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeOuterIndex, setActiveOuterIndex] = useState<number | null>(null)

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
    '#6940d1', // Vibrant Purple
    '#45169a', // Deep Purple
    '#241454', // Very Dark Purple
    '#231552', // Near Black Purple
  ]

  const COLORS_OUTER: string[] = [
    '#dbd5f9', // Light Lavender
    '#bdaff9', // Soft Purple
    '#7dddd2', // Mint Pastel
    '#00b3af', // Teal
    '#6940d1', // Reuse for transition
    '#45169a', // Reuse for continuity
    '#00b3af', // Reuse for balance
    '#bdaff9', // Reuse to fill 8 items
  ]

  // Отображать текст только при наведении вместо постоянного отображения
  const renderInnerLabel = ({ name, percent, index }: PieItemProps) => {
    const isActive = index === activeIndex

    if (!isActive) {
      return null
    }

    return (
      <text
        x={0}
        y={0}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="bold"
      >
        {`${name}\n${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  // Внешние метки отображаются в тултипе, но не на графике
  const renderOuterLabel = () => null

  // Обработчики для увеличения секторов при наведении
  const onInnerPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onInnerPieLeave = () => {
    setActiveIndex(null)
  }

  const onOuterPieEnter = (_: any, index: number) => {
    setActiveOuterIndex(index)
  }

  const onOuterPieLeave = () => {
    setActiveOuterIndex(null)
  }

  // Вычисление радиуса в зависимости от активности
  const getInnerRadius = (index: number) => {
    return index === activeIndex ? 0 : 0
  }

  const getOuterRadius = (index: number) => {
    return index === activeIndex ? 110 : 100
  }

  const getOuterInnerRadius = (index: number) => {
    return index === activeOuterIndex ? 108 : 110
  }

  const getOuterOuterRadius = (index: number) => {
    return index === activeOuterIndex ? 187 : 170
  }

  // Создание пользовательских стилей для удаления выделения при клике
  const pieChartStyle = {
    outline: 'none',
    userSelect: 'none',
  }

  const pieStyle = {
    outline: 'none',
  }

  return (
    <Card className="h-[550px] w-full space-y-4">
      <CardHeader>
        <div className="text-xl font-bold text-black-1000">
          Диаграмма кредитных рисков
        </div>
      </CardHeader>
      <div className="relative h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={pieChartStyle}>
            {/* Inner Ring (Credit Types) */}
            <Pie
              data={creditData}
              dataKey="value"
              nameKey="name"
              startAngle={90}
              endAngle={-270}
              innerRadius={0}
              outerRadius={100}
              paddingAngle={2}
              label={renderInnerLabel}
              labelLine={false}
              onMouseEnter={onInnerPieEnter}
              onMouseLeave={onInnerPieLeave}
              style={pieStyle}
              isAnimationActive={false}
              animationDuration={300}
              animationEasing="ease-in-out"
            >
              {creditData.map((entry, index) => (
                <Cell
                  key={`inner-${index}`}
                  fill={COLORS_INNER[index % COLORS_INNER.length]}
                  stroke={index === activeIndex ? '#000' : 'none'}
                  strokeWidth={index === activeIndex ? 2 : 0}
                  innerRadius={getInnerRadius(index)}
                  outerRadius={getOuterRadius(index)}
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
              paddingAngle={2}
              label={renderOuterLabel}
              labelLine={false}
              onMouseEnter={onOuterPieEnter}
              onMouseLeave={onOuterPieLeave}
              style={pieStyle}
              isAnimationActive={false}
              animationDuration={300}
              animationEasing="ease-in-out"
            >
              {outerData.map((entry, index) => (
                <Cell
                  key={`outer-${index}`}
                  fill={COLORS_OUTER[index % COLORS_OUTER.length]}
                  stroke={index === activeOuterIndex ? '#000' : 'none'}
                  strokeWidth={index === activeOuterIndex ? 2 : 0}
                  innerRadius={getOuterInnerRadius(index)}
                  outerRadius={getOuterOuterRadius(index)}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name, props) => [
                `${value} (${((value / props.payload.payload.total) * 100).toFixed(0)}%)`,
                `${props.payload.parentName ? props.payload.parentName + ' - ' : ''}${name}`,
              ]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                padding: '10px',
                border: 'none',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Легенда внизу графика */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {creditData.map((entry, index) => (
            <div
              key={`legend-${index}`}
              className="flex items-center gap-2"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="h-4 w-4 rounded-sm"
                style={{
                  backgroundColor: COLORS_INNER[index % COLORS_INNER.length],
                }}
              />
              <span className="text-sm">
                {entry.name} ({entry.value})
              </span>
            </div>
          ))}
        </div>
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
    <div className="h-full min-h-[115vh] w-full space-y-6 p-6">
      <div className="flex items-center justify-between px-1.5">
        <div className="text-2xl font-bold leading-38 text-black-1000">
          Аналитика по портфелю {debtorTypeHelper[search.type]} кредитов
        </div>
        <Button variant={'primary'} onClick={handleContinue}>
          Перейти к отчётам
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <RiskSummaryCard
          value={122421.21}
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
