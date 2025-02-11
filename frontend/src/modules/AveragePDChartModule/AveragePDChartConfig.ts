import { CSSProperties } from 'react'
import { TooltipProps } from 'recharts'
import { AveragePD } from '@/models/AveragePD'

export const CHART_MARGINS = {
  top: 5,
  right: 30,
  left: 0,
  bottom: 5,
} as const

export const AXIS_CONFIG = {
  xAxis: {
    type: 'number' as const,
    domain: [0, 25] as [number, number],
    tickFormatter: (value: number) => `${value}%`,
  },
  yAxis: {
    dataKey: 'product',
    type: 'category' as const,
    tick: { fontSize: 14 },
    width: 200,
  },
} as const

export const BAR_CONFIG = {
  barSize: 30,
  barGap: 1,
  dataKey: 'value',
  fill: 'var(--chart80)',
  radius: [0, 4, 4, 0] as [number, number, number, number],
} as const

export const GRID_CONFIG = {
  strokeDasharray: '3 3',
  horizontal: false,
} as const

export interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean
  payload?: Array<{
    value: number
    payload: AveragePD[number]
  }>
}

export const tooltipStyles: CSSProperties = {
  backgroundColor: 'white',
  padding: '8px',
  border: '1px solid #e5e7eb',
  borderRadius: '4px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
}
