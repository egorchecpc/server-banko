import { MacroSettings } from '@/models/MacroSettings'
import { v4 as uuidv4 } from 'uuid'

interface ScenarioData {
  value: number
  probability: number
}

interface MetricScenarios {
  worst: ScenarioData
  norm: ScenarioData
  best: ScenarioData
}

interface YearMetricData {
  [metric: string]: MetricScenarios
}

interface TransformedValues {
  [year: string]: {
    worst: ScenarioData
    norm: ScenarioData
    best: ScenarioData
  }
}

export const formatMacroDataFromServer = (
  macroData: MacroSettings | undefined
): MacroSettings[] => {
  if (!macroData) return []

  const metrics = new Set<string>()
  Object.values(macroData).forEach((yearData: YearMetricData) => {
    Object.keys(yearData).forEach((metric) => metrics.add(metric))
  })

  return Array.from(metrics).map((metric) => {
    const values: TransformedValues = {}

    Object.entries(macroData).forEach(
      ([yearKey, yearData]: [string, YearMetricData]) => {
        const year = yearKey.replace('year', '')
        if (yearData[metric]) {
          values[year] = {
            worst: {
              value: yearData[metric].worst.value,
              probability: yearData[metric].worst.probability * 100,
            },
            norm: {
              value: yearData[metric].norm.value,
              probability: yearData[metric].norm.probability * 100,
            },
            best: {
              value: yearData[metric].best.value,
              probability: yearData[metric].best.probability * 100,
            },
          }
        }
      }
    )

    return {
      id: uuidv4(),
      type: metric,
      values,
    }
  })
}
