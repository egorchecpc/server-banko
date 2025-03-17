import { FC } from 'react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  ContainerBody,
  ContainerComponent,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import { VBSOKUDataItem } from '@/models/VBSOKU'
import { VBSOKUChartConfig } from '@/modules/VBSOKUChart/VBSOKUChartConfig'
import ChartControls from '@/modules/ChartControlModule/ChartControl'
import { downloadExcelFile } from '@/utils/downloadUtils'

interface VBSOKUChartProps {
  data: VBSOKUDataItem[]
}

const VBSOKUChartModule: FC<VBSOKUChartProps> = ({ data }) => {
  const sortedData = [...data].reverse()
  const { margins, barSize, yAxisRightDomain, series, axes } = VBSOKUChartConfig

  const handleLegendFormatter = (value: string): string => {
    return series[value as keyof typeof series]?.label || value
  }

  const handleValueFormatter = (value: number, name: string): string => {
    const formatter = series[name as keyof typeof series]?.valueFormatter
    return formatter ? formatter(value) : value.toString()
  }

  const onDownload = () => {
    downloadExcelFile('/data/chart3.xlsx', 'chart3.xlsx')
  }

  return (
    <ContainerComponent withBg={true}>
      <ContainerHeader>
        <div className="flex w-full items-center justify-between">
          <div className="text-xl font-bold leading-24 text-black-1000">
            ВБC/ОКУ
          </div>
          <ChartControls chartDescription="ВБC/ОКУ" onDownload={onDownload} />
        </div>
      </ContainerHeader>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <ChartContainer
          config={{
            vbs: {
              label: series.vbs.label,
              color: series.vbs.color,
            },
            okuPercentage: {
              label: series.okuPercentage.label,
              color: series.okuPercentage.color,
            },
          }}
          className="h-[25rem] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sortedData} margin={margins}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                tickFormatter={axes.yLeft.tickFormatter}
                axisLine={false}
                tickLine={false}
                label={axes.yLeft.label}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={yAxisRightDomain}
                tickFormatter={axes.yRight.tickFormatter}
                axisLine={false}
                tickLine={false}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent valueFormatter={handleValueFormatter} />
                }
              />
              <Legend
                align="center"
                verticalAlign="bottom"
                formatter={handleLegendFormatter}
              />
              <Bar
                dataKey="vbs"
                yAxisId="left"
                fill={series.vbs.color}
                radius={[4, 4, 0, 0]}
                barSize={barSize}
              />
              <Line
                type="monotone"
                dataKey="okuPercentage"
                yAxisId="right"
                stroke={series.okuPercentage.color}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ContainerBody>
    </ContainerComponent>
  )
}

export default VBSOKUChartModule
