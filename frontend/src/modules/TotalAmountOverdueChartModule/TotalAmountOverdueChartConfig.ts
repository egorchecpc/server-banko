interface ChartConfig {
  height: number
  margin: {
    top: number
    right: number
    bottom: number
    left: number
  }
  defaultColors: string[]
}

export const chartConfig: ChartConfig = {
  height: 400,
  margin: {
    top: 20,
    right: 30,
    bottom: 20,
    left: 60,
  },
  defaultColors: ['var(--chart80)', 'var(--chart60)', 'var(--chart40)'],
}
