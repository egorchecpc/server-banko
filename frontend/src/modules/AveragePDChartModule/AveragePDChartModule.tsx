import { FC, memo } from 'react'
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

const AveragePDChartModule: FC<AveragePDChartModuleProps> = ({ data }) => (
  <ContainerComponent withBg={true} title="Средневзвешанный PD">
    <ContainerBody isScrolling={true} orientation="horizontal">
      <div className="h-[25rem] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={CHART_MARGINS}>
            <CartesianGrid {...GRID_CONFIG} />
            <XAxis {...AXIS_CONFIG.xAxis} />
            <YAxis {...AXIS_CONFIG.yAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Bar {...BAR_CONFIG} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ContainerBody>
  </ContainerComponent>
)

export default memo(AveragePDChartModule)
