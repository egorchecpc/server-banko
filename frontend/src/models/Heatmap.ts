export interface NewHeatmapItem {
  product: string
  without: number
  between1To30: number
  between31To60: number
  between61To90: number
  moreThen90: number
}

export interface HeatmapData {
  categories: string[]
  periods: string[]
  values: number[][]
}
