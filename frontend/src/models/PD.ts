export interface PDItem {
  date: string
  without: number
  between1To30: number
  between31To60: number
  between61To90: number
  moreThen90: number
}

export interface YearlyDataResponse {
  [year: string]: {
    cpd: PDItem
  }
}

export interface QuarterlyDataResponse {
  [year: string]: {
    cpd: PDItem[]
  }
}

export interface ForecastDataResponse {
  [year: string]: {
    cpd: PDItem[]
    mpd: PDItem[]
  }
}
