import { createContext, useContext, useState } from 'react'

interface Dataset {
  id: string
  name: string
  date: string
}

interface DatasetContextType {
  datasetReport: Dataset | null
  setDatasetReport: (report: Dataset) => void
}

const DatasetContext = createContext<DatasetContextType>({
  datasetReport: null,
  setDatasetReport: () => {},
})

export const useDatasetReport = () => useContext(DatasetContext)

export const DatasetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [datasetReport, setDatasetReport] = useState<Dataset | null>(null)

  return (
    <DatasetContext.Provider value={{ datasetReport, setDatasetReport }}>
      {children}
    </DatasetContext.Provider>
  )
}
