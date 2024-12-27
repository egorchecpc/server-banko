export interface FormatedMacroSettings {
  [year: string]: {
    [dataType: string]: {
      [scenario: string]: {
        value: number
        probability: number
      }
    }
  }
}
