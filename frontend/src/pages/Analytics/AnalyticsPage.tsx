import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
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
} from 'recharts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import Footer from '@/components/FooterComponent/Footer'

// Mock data - replace with your actual data

// Risk Summary Card Component
const RiskSummaryCard = ({ value, label, percentage, variant }) => {
  const variantStyles = {
    'high-risk': 'bg-red-100 text-red-800',
    'medium-risk': 'bg-yellow-100 text-yellow-800',
    'low-risk': 'bg-green-100 text-green-800',
  }

  return (
    <Card className="relative w-full">
      <Badge
        className={`absolute right-2 top-2 ${variantStyles[variant] || 'bg-blue-100 text-blue-800'}`}
      >
        {variant ? `${variant.replace('-', ' ').toUpperCase()}` : 'RISK'}
      </Badge>
      <CardContent className="pt-6">
        <div className="py-1.5 text-2xl font-bold">
          {value.toLocaleString()}М BYN
        </div>
        <div className="text-muted-foreground py-1.5 text-sm">{label}</div>
        <div className="py-1.5 text-xs text-green-600">
          {percentage * 100}% в резерве
        </div>
      </CardContent>
    </Card>
  )
}

const transactionRiskData = [
  { month: 'Янв', risk: 2.5 },
  { month: 'Фев', risk: 3.0 },
  { month: 'Март', risk: 3.5 },
  { month: 'Апр', risk: 3.2 },
  { month: 'Май', risk: 4.0 },
  { month: 'Июн', risk: 4.5 },
  { month: 'Июл', risk: 4.2 },
  { month: 'Авг', risk: 4.7 },
  { month: 'Сент', risk: 4.3 },
  { month: 'Окт', risk: 4.8 },
  { month: 'Нояб', risk: 5.0 },
  { month: 'Дек', risk: 4.9 },
].map((item) => ({ ...item, reservationPercent: item.risk }))

const TransactionRiskChart = () => {
  const [timeframe, setTimeframe] = useState('Month')
  const [selectedTimeframe, setSelectedTimeframe] = useState('Месяц')

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded border bg-white p-4 shadow-lg">
          <p className="font-bold">
            Процент резервирования: {payload[0].value}%
          </p>
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
            <div className="text-xl font-bold leading-38 text-black-900">
              Кредитные риски
            </div>
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe">
                  {selectedTimeframe}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Month">Месяц</SelectItem>
                <SelectItem value="Quarter">Квартал</SelectItem>
                <SelectItem value="Year">Год</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="h-full">
          <ResponsiveContainer width="100%" height="85%" className="py-1.5">
            <BarChart data={transactionRiskData} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                label={{
                  value: 'Процент резервов',
                  angle: -90,
                  position: 'insideLeft',
                }}
                tickFormatter={(tick) => `${tick}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="reservationPercent" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
// Control Points Component
const RiskyAssets = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const riskyAssetsList = [
    { name: 'Empty Tax Field', type: 'financial' },
    { name: 'Unusual Amount', type: 'transaction' },
    { name: 'Complex Structure', type: 'legal' },
    { name: 'Complex Instrument', type: 'financial' },
    { name: 'Manual Entry', type: 'operational' },
  ]

  const filteredAssets = riskyAssetsList.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === 'all' || asset.type === filterType)
  )

  return (
    <Card className="h-96 w-full">
      <CardHeader>
        <div className="text-xl font-bold leading-38 text-black-900">
          Самые рисковые активы
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <Input
            placeholder="Поиск рисковых активов"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded border p-2"
          >
            <option value="all">Все типы</option>
            <option value="financial">Финансовые</option>
            <option value="transaction">Транзакционные</option>
            <option value="legal">Юридические</option>
            <option value="operational">Операционные</option>
            <option value="process">Процессные</option>
            <option value="data">Данные</option>
            <option value="compliance">Комплаенс</option>
          </select>
        </div>
        <div>
          {filteredAssets.map((asset, index) => (
            <div
              key={index}
              className="mb-2 flex items-center justify-between rounded bg-gray-50 p-2"
            >
              <span className="text-sm text-gray-700">{asset.name}</span>
              <span className="text-xs italic text-gray-500">{asset.type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Risk Scatter Plot Component
const RiskScatterPlot = () => {
  // More realistic data representing credit volume, borrower income, and ECL (Expected Credit Loss)
  const scatterData = [
    { x: 50000, y: 30000, z: 5, id: 1, risk: 'Низкий' },
    { x: 120000, y: 45000, z: 15, id: 2, risk: 'Умеренный' },
    { x: 200000, y: 60000, z: 25, id: 3, risk: 'Умеренный' },
    { x: 300000, y: 75000, z: 40, id: 4, risk: 'Высокий' },
    { x: 80000, y: 35000, z: 10, id: 5, risk: 'Низкий' },
    { x: 180000, y: 55000, z: 30, id: 6, risk: 'Средний' },
    { x: 250000, y: 65000, z: 35, id: 7, risk: 'Средний' },
    { x: 400000, y: 90000, z: 50, id: 8, risk: 'Высокий' },
  ]

  // Custom tooltip to display more information
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded border bg-white p-4 shadow-lg">
          <p className="font-bold">Кредитный профиль #{data.id}</p>
          <p>Объем кредита: {data.x.toLocaleString()} руб.</p>
          <p>Доход заемщика: {data.y.toLocaleString()} руб.</p>
          <p>ECL: {data.z}%</p>
          <p>Уровень риска: {data.risk}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="h-[550px] w-full">
      <CardHeader>
        <div className="text-xl font-bold leading-38 text-black-900">
          Анализ кредитных рисков
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <ResponsiveContainer width="100%" height="85%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name="Объем кредита"
              unit=" руб."
              tickFormatter={(value) => `${(value / 1000).toFixed(0)} тыс.`}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Доход заемщика"
              unit=" руб."
              tickFormatter={(value) => `${(value / 1000).toFixed(0)} тыс.`}
            />
            <ZAxis type="number" dataKey="z" range={[10, 100]} name="ECL" />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Scatter
              name="Кредитные риски"
              data={scatterData}
              fill="#10b981"
              fillOpacity={0.7}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

const CreditTypesSunburstChart = () => {
  const creditData = [
    {
      name: 'Розничные',
      value: 100,
      children: [
        { name: 'Ипотека', value: 25 },
        { name: 'Авто', value: 25 },
        { name: 'Потребительский', value: 25 },
        { name: 'Кредитная карта', value: 25 },
      ],
    },
    {
      name: 'Корп',
      value: 100,
      children: [
        { name: 'Инвестиционный', value: 30 },
        { name: 'Оборотный', value: 20 },
        { name: 'Проектное финансирование', value: 25 },
        { name: 'Овердрафт', value: 25 },
      ],
    },
    {
      name: 'Межбанковск',
      value: 100,
      children: [
        { name: 'Краткосрочный', value: 35 },
        { name: 'Долгосрочный', value: 15 },
        { name: 'Overnight', value: 25 },
        { name: 'Своп', value: 25 },
      ],
    },
    {
      name: 'Суверены',
      value: 100,
      children: [
        { name: 'Государственный', value: 20 },
        { name: 'Муниципальный', value: 25 },
        { name: 'Целевой', value: 30 },
        { name: 'Экспортный', value: 25 },
      ],
    },
  ]

  // Flatten the data for the outer ring
  const outerData = creditData.flatMap((parent) =>
    parent.children.map((child) => ({
      ...child,
      parentName: parent.name,
    }))
  )

  // Color palettes
  const COLORS_INNER = [
    '#1e90ff', // Dodger Blue
    '#4169e1', // Royal Blue
    '#0000cd', // Medium Blue
    '#00008b', // Dark Blue
  ]
  const COLORS_OUTER = [
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
  const renderInnerLabel = ({ name, percent }) => {
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
  const renderOuterLabel = ({ name, percent, parentName }) => {
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

const debtorTypeHelper = {
  retail: 'розничных',
  corporate: 'корпоративных',
  interbank: 'межбанковских',
  sovereign: 'суверенных',
}

const FinancialDashboard = () => {
  const search: { type: string } = useSearch({
    strict: false,
  })
  const navigate = useNavigate()
  const handleContinue = () => {
    navigate({ to: '/reports', search: { type: search.type } })
  }
  return (
    <div className="h-full w-full space-y-6 p-6">
      <div className="flex items-center justify-between px-1.5">
        <div className="text-2xl font-bold leading-38 text-black-900">
          Аналитика по портфелю {debtorTypeHelper[search.type]} кредитов
        </div>
        <Button variant={'primary'} onClick={handleContinue}>
          Перейти к отчётам
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <RiskSummaryCard
          value={44.7}
          label="Общая сумма розничных кредитов в третьей стадии"
          percentage={0.16}
          variant="low-risk"
        />
        <RiskSummaryCard
          value={45.92}
          label="Общая сумма розничных кредитов во второй стадии"
          percentage={0.25}
          variant="medium-risk"
        />
        <RiskSummaryCard
          value={14323.6}
          label="Общая сумма розничных кредитов в первой стадии"
          percentage={0.36}
          variant="high-risk"
        />
      </div>
      <div className="mb-6"></div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <TransactionRiskChart />
        </div>
        <div className="col-span-3 mb-3">
          <RiskyAssets />
        </div>
      </div>
      <div className="!mb-[80px] grid grid-cols-2 gap-6">
        <CreditTypesSunburstChart />
        <RiskScatterPlot />
      </div>
    </div>
  )
}

export default FinancialDashboard
