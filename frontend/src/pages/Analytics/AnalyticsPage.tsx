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
import { Link } from '@tanstack/react-router'

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

      {/* Condensed Chart
      <Card className="h-48 w-full">
        <CardContent className="h-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transactionRiskData} barSize={20}>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(tick) => `${tick}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="reservationPercent" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      */}
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
    <Card className="h-[49vh] w-full">
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

const RiskByAccountChart = () => {
  return (
    <Card className="h-96 w-full">
      <CardHeader>
        <CardTitle>Risk by Account</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full items-center justify-center">
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <circle cx="200" cy="200" r="180" fill="#f0f9ff" />
          {/* Mock sunburst segments with different colors and sizes */}
          <path
            d="M200,200 L350,100 A180,180 0 0,1 320,320 Z"
            fill="#10b981"
            opacity="0.7"
          />
          <path
            d="M200,200 L320,320 A180,180 0 0,1 80,320 Z"
            fill="#34d399"
            opacity="0.7"
          />
          <path
            d="M200,200 L80,320 A180,180 0 0,1 50,100 Z"
            fill="#6ee7b7"
            opacity="0.7"
          />
          <text
            x="200"
            y="200"
            textAnchor="middle"
            dy=".3em"
            className="text-sm"
          >
            Accounts
          </text>
        </svg>
      </CardContent>
    </Card>
  )
}

// Risk Scatter Plot Component
const RiskScatterPlot = () => {
  // Mock data for scatter plot
  const scatterData = [
    { x: 100, y: 200, z: 50 },
    { x: 200, y: 150, z: 30 },
    { x: 300, y: 250, z: 70 },
    { x: 400, y: 100, z: 20 },
    { x: 500, y: 300, z: 90 },
  ]

  return (
    <Card className="h-96 w-full">
      <CardHeader>
        <CardTitle>Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ResponsiveContainer width="100%" height="85%">
          <ScatterChart>
            <XAxis type="number" dataKey="x" name="X" />
            <YAxis type="number" dataKey="y" name="Y" />
            <ZAxis type="number" dataKey="z" range={[10, 100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              name="Risk Points"
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
        { name: 'Авто', value: 20 },
        { name: 'Потребительский', value: 15 },
        { name: 'Кредитная карта', value: 10 },
      ],
    },
    {
      name: 'Корп',
      value: 100,
      children: [
        { name: 'Инвестиционный', value: 30 },
        { name: 'Оборотный', value: 25 },
        { name: 'Проектное финансирование', value: 20 },
        { name: 'Овердрафт', value: 15 },
      ],
    },
    {
      name: 'Межбанковск',
      value: 100,
      children: [
        { name: 'Краткосрочный', value: 35 },
        { name: 'Долгосрочный', value: 25 },
        { name: 'Overnight', value: 20 },
        { name: 'Своп', value: 15 },
      ],
    },
    {
      name: 'Суверены',
      value: 100,
      children: [
        { name: 'Государственный', value: 20 },
        { name: 'Муниципальный', value: 25 },
        { name: 'Целевой', value: 30 },
        { name: 'Экспортный', value: 15 },
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
  const COLORS_INNER = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12']
  const COLORS_OUTER = [
    '#85c1e9',
    '#76d7c4',
    '#f1948a',
    '#f5cba7',
    '#5dade2',
    '#82e0aa',
    '#f1948a',
    '#f0b27a',
  ]

  return (
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
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
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
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
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
  )
}

const FinancialDashboard = () => {
  return (
    <div className="h-[180vh] w-full space-y-6 p-6">
      <div className="flex items-center justify-between px-1.5">
        <div className="text-2xl font-bold leading-38 text-black-900">
          Аналитика по портфелю
        </div>
        <Button variant={'primary'}>
          <Link to={'/apps'}>Перейти к отчётам</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <RiskSummaryCard
          value={14323.6}
          label="Общая сумма розничных кредитов"
          percentage={0.36}
          variant="high-risk"
        />
        <RiskSummaryCard
          value={45.92}
          label="Общая сумма корпоративных кредитов"
          percentage={0.25}
          variant="medium-risk"
        />
        <RiskSummaryCard
          value={44.7}
          label="Общая сумма межбанковских кредитов"
          percentage={0.16}
          variant="low-risk"
        />
      </div>
      <div className="mb-6"></div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <TransactionRiskChart />
        </div>
        <div className="col-span-3">
          <RiskyAssets />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CreditTypesSunburstChart />
        <RiskScatterPlot />
      </div>
    </div>
  )
}

export default FinancialDashboard
