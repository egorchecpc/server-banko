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
import { CategoryChartItem } from '@/models/CategoryChartItem'
import { FC } from 'react'

const barData = [
  {
    category: 'Потреб. кредиты',
    without: 50,
    overdue0: 100,
    overdue30: 250,
    overdue60: 180,
    overdue90: 120,
  },
  {
    category: 'Ипотека',
    without: 50,
    overdue0: 100,
    overdue30: 150,
    overdue60: 100,
    overdue90: 80,
  },
  {
    category: 'Овердрафт',
    without: 50,
    overdue0: 100,
    overdue30: 100,
    overdue60: 70,
    overdue90: 50,
  },
]
interface DistributionCategoryChartModalProps {
  data: CategoryChartItem[]
}

export const DistributionCategoryChartModal: FC<
  DistributionCategoryChartModalProps
> = ({ data }) => {
  return (
    <ContainerComponent withBg={true}>
      <ContainerHeader>
        <div className="mb-3 mt-1 text-xl font-bold leading-24 text-black-800">
          Распределение ВБС по категориям
        </div>
      </ContainerHeader>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
              <Legend />
              <Bar
                dataKey="without"
                name="без просрочки"
                fill="var(--chart20)"
                stackId="a"
                barSize={30}
              />
              <Bar
                dataKey="overdue0"
                name="0-30 дней"
                fill="var(--chart20)"
                stackId="a"
                barSize={30}
              />
              <Bar
                dataKey="overdue30"
                name="30-60 дней"
                fill="var(--chart40)"
                stackId="a"
                barSize={30}
              />
              <Bar
                dataKey="overdue60"
                name="60-90 дней"
                fill="var(--chart60)"
                stackId="a"
                barSize={30}
              />
              <Bar
                dataKey="overdue90"
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
