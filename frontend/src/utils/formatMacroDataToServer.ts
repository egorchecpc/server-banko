import { MacroSettings } from '@/models/MacroSettings'
import { FormatedMacroSettings } from '@/models/FormatedMacroSettings'

export function formatMacroDataToServer(
  indicators: MacroSettings[] | undefined
): FormatedMacroSettings {
  const formattedData: FormatedMacroSettings = {}
  if (indicators) {
    indicators.forEach((indicator) => {
      Object.entries(indicator.values).forEach(([year, dataByScenarios]) => {
        const yearKey = `year${year}`
        if (!formattedData[yearKey]) {
          formattedData[yearKey] = {}
        }

        formattedData[yearKey][indicator.type] = Object.fromEntries(
          Object.entries(dataByScenarios).map(
            ([scenario, { value, probability }]) => [
              scenario,
              {
                value,
                probability: probability / 100,
              },
            ]
          )
        )
      })
    })
  }
  return formattedData
}
