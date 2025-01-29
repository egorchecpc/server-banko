import { createContext, useContext, ReactNode, useState } from 'react'

interface ReportDataContext {
  date: string | null
  name: string | null
}
interface ReportContextType {
  selectedData: ReportDataContext
  setSelectedData: (date: ReportDataContext) => void
}

const ReportContext = createContext<ReportContextType | null>(null)

interface ReportProviderProps {
  children: ReactNode
}

export const ReportProvider = ({ children }: ReportProviderProps) => {
  const [selectedData, setSelectedData] = useState<ReportDataContext>({
    date: null,
    name: null,
  })

  return (
    <ReportContext.Provider value={{ selectedData, setSelectedData }}>
      {children}
    </ReportContext.Provider>
  )
}

export const useReport = () => {
  const context = useContext(ReportContext)
  if (!context) {
    throw new Error('useReport must be used within a ReportProvider')
  }
  return context
}
