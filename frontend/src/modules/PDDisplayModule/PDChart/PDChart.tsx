import { FC } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ChartProps {
  title: string
  data: Array<{
    period: string // Годы по оси X
    cPD: number // Значения для cPD
    mPD: number
  }>
}

const PDChart: FC<ChartProps> = ({ title, data }) => {
  const colors = {
    cPD: 'var(--chart80)',
    mPD: 'lightblue',
  }
  return (
    <div className="mb-6">
      <h2 className="mb-4 text-center text-lg font-semibold">{title}</h2>
      <ResponsiveContainer width="100%" height={300} className="px-20">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="period"
            label={{ value: '', position: 'insideBottom', dy: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cPD"
            stroke={colors.cPD}
            strokeWidth={1.5}
            name="cPD"
          />
          <Line
            type="monotone"
            dataKey="mPD"
            stroke={colors.mPD}
            strokeWidth={1.5}
            name="mPD"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PDChart
