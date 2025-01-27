import { createContext, useContext, useState, ReactNode } from 'react'

interface ReportIdContextType {
  reportId: string | null
  setReportId: (id: string) => void
}

const ReportIdContext = createContext<ReportIdContextType | undefined>(
  undefined
)

interface UserProviderProps {
  children: ReactNode
}

export const ReportIdProvider = ({ children }: UserProviderProps) => {
  const [reportId, setReportId] = useState<string | null>(null)

  return (
    <ReportIdContext.Provider value={{ reportId, setReportId }}>
      {children}
    </ReportIdContext.Provider>
  )
}

export const useReportId = () => {
  const context = useContext(ReportIdContext)
  if (context === undefined) {
    throw new Error('useReportId must be used within a ReportIdProvider')
  }
  return context
}
