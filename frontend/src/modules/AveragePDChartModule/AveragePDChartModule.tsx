import { FC, memo, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { AveragePD } from '@/models/AveragePD'
import {
  CHART_MARGINS,
  AXIS_CONFIG,
  BAR_CONFIG,
  GRID_CONFIG,
  CustomTooltipProps,
  tooltipStyles,
} from './AveragePDChartConfig'
import {
  ContainerBody,
  ContainerComponent,
} from '@/components/ContainerComponent/ContainerComponent'

interface AveragePDChartModuleProps {
  data: AveragePD
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null

  return (
    <div style={tooltipStyles}>
      <p className="text-sm">{`${payload[0].payload.category}: ${payload[0].value}%`}</p>
    </div>
  )
}

const AveragePDChartModule: FC<AveragePDChartModuleProps> = ({ data }) => {
  const chartHeight = useMemo(() => {
    const baseHeight = 100
    const itemHeight = 50
    const calculatedHeight = baseHeight + data.length * itemHeight
    return Math.min(Math.max(calculatedHeight, 250), 800)
  }, [data.length])

  return (
    <ContainerComponent withBg={true} title="Средневзвешенный PD">
      <ContainerBody isScrolling={true} orientation="horizontal">
        <div style={{ height: `${chartHeight}px` }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={CHART_MARGINS}>
              <CartesianGrid {...GRID_CONFIG} />
              <XAxis {...AXIS_CONFIG.xAxis} />
              <YAxis {...AXIS_CONFIG.yAxis} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
              <Bar {...BAR_CONFIG} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ContainerBody>
    </ContainerComponent>
  )
}

export default memo(AveragePDChartModule)
