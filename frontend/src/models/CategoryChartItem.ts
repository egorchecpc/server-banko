export type CategoryChartItem = {
  creditType: string
  product: string | null
  without: number
  between1To30: number
  between31To60: number
  between61To90: number
  moreThen90: number
  products?: CategoryChartItem[] | null
}
