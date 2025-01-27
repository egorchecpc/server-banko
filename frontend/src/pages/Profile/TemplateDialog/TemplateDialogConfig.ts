import { MacroSettings } from '@/models/MacroSettings'

export const YEARS = [2024, 2025, 2026, 2027]
export const SCENARIOS = ['worst', 'norm', 'best'] as const

export const INDICATOR_TYPES = [
  'productProfitability',
  'realWage',
  'gdp',
  'realDisposablePopulationIncome',
  'averageMonthlySalary',
] as const

export const scenarioNames = {
  worst: 'Худший',
  norm: 'Базовый',
  best: 'Лучший',
} as const

export const indicatorNames = {
  productProfitability: 'Рентабельность продукции',
  realWage: 'Реальная заработная плата',
  gdp: 'ВВП',
  realDisposablePopulationIncome: 'Реальные располагаемые доходы населения',
  averageMonthlySalary: 'Среднемесячная заработная плата',
} as const

export const DEFAULT_INDICATOR: MacroSettings = {
  id: '',
  type: 'productProfitability',
  values: YEARS.reduce(
    (acc, year) => ({
      ...acc,
      [year]: {
        worst: { value: 0, probability: 0 },
        norm: { value: 0, probability: 0 },
        best: { value: 0, probability: 0 },
      },
    }),
    {}
  ),
}
