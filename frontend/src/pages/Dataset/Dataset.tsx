import { useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { DatasetModal } from '@/modules/DatasetModule/DatasetModule'

export const DatasetPage = () => {
  const navigate = useNavigate()
  const search = useSearch<{ type: string }>({
    strict: false,
  })

  const [currentDataset, setCurrentDataset] = useState({
    id: 'ds-2025-04-03-981465',
    name: 'Финансовый отчет Q4 2024',
    date: '03.04.2025',
  })

  const handleContinue = () => {
    navigate({ to: '/analyzer', search: { type: search.type } })
  }

  // Функция для обновления датасета
  const handleDatasetUpdate = (updatedDataset) => {
    setCurrentDataset(updatedDataset)
  }

  return (
    <div className="h-[125vh]">
      <DatasetModal
        currentDataset={currentDataset}
        onContinue={handleContinue}
        type={search.type}
        onDatasetUpdate={handleDatasetUpdate}
      />
    </div>
  )
}
