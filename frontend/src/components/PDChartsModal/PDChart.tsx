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
  data: Array<{ period: string; cPD: number; mPD: number }>
}

const PDChart: FC<ChartProps> = ({ title, data }) => {
  return (
    <div className="mb-6">
      <h2 className="mb-4 text-center text-lg font-semibold">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cPD" stroke="#8884d8" name="cPD" />
          <Line type="monotone" dataKey="mPD" stroke="#82ca9d" name="mPD" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PDChart
