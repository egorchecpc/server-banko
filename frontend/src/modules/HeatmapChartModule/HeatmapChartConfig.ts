export interface HeatmapConfig {
  cellHeight: number
  leftAxisWidth: number
  rightLegendWidth: number
  bottomAxisHeight: number
  topMargin: number
  minCellWidth: number
  legendValues: number[]
}

export const HEATMAP_COLORS = {
  min: '#FFFFE0',
  mid: '#4AB8C1',
  max: '#000080',
}

export const DEFAULT_CONFIG: HeatmapConfig = {
  cellHeight: 40,
  leftAxisWidth: 200,
  rightLegendWidth: 60,
  bottomAxisHeight: 60,
  topMargin: 20,
  minCellWidth: 50,
  legendValues: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
}

export const getColorScale = (value: number): string => {
  if (value <= 33) {
    return interpolateColor(HEATMAP_COLORS.min, HEATMAP_COLORS.mid, value / 33)
  } else if (value <= 66) {
    return interpolateColor(
      HEATMAP_COLORS.mid,
      HEATMAP_COLORS.max,
      (value - 33) / 33
    )
  } else {
    return interpolateColor(HEATMAP_COLORS.max, '#000033', (value - 66) / 34)
  }
}

const interpolateColor = (
  color1: string,
  color2: string,
  factor: number
): string => {
  const result = color1.match(/\w\w/g)?.map((a, i) => {
    const c1 = parseInt(a, 16)
    const c2 = parseInt(color2.match(/\w\w/g)?.[i] ?? '00', 16)
    const hex = Math.round(c1 + (c2 - c1) * factor).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  })
  return '#' + (result?.join('') ?? '')
}

export const calculateDimensions = (
  containerWidth: number,
  periodsLength: number,
  config: HeatmapConfig
) => {
  const availableWidth =
    containerWidth - config.leftAxisWidth - config.rightLegendWidth
  return Math.max(config.minCellWidth, availableWidth / periodsLength)
}
