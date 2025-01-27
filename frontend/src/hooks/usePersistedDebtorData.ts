import { useState, useEffect } from 'react'
import { DebtorData } from '@/models/DebtorData'
import { MacroSettings } from '@/models/MacroSettings'

// Hook for managing debtor form data
export const usePersistedDebtorData = () => {
  const [debtorData, setDebtorData] = useState<DebtorData | null>(() => {
    const savedData = localStorage.getItem('debtorData')
    return savedData ? JSON.parse(savedData) : null
  })

  useEffect(() => {
    if (debtorData) {
      localStorage.setItem('debtorData', JSON.stringify(debtorData))
    }
  }, [debtorData])

  const clearDebtorData = () => {
    localStorage.removeItem('debtorData')
    setDebtorData(null)
  }

  return { debtorData, setDebtorData, clearDebtorData }
}

// Hook for managing macro settings data
export const usePersistedMacroData = () => {
  const [macroData, setMacroData] = useState<MacroSettings[]>(() => {
    const savedData = localStorage.getItem('macroData')
    return savedData ? JSON.parse(savedData) : []
  })

  useEffect(() => {
    localStorage.setItem('macroData', JSON.stringify(macroData))
  }, [macroData])

  const clearMacroData = () => {
    localStorage.removeItem('macroData')
    setMacroData([])
  }

  return { macroData, setMacroData, clearMacroData }
}
