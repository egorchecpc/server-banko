import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  DebtorType,
  DebtorTypeSelector,
} from '@/components/TypeSelector/TypeSelector'
import { DEBTOR_TYPES } from '@/pages/Apps/AppsPageConfig'

export const AppsPage = () => {
  const [selectedType, setSelectedType] = useState<DebtorType | null>(null)
  const navigate = useNavigate()

  const handleContinue = () => {
    if (selectedType) {
      navigate({ to: '/analyzer', search: { type: selectedType } })
    }
  }

  return (
    <div className="h-[125vh]">
      <DebtorTypeSelector
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
        onContinue={handleContinue}
        options={DEBTOR_TYPES}
      />
    </div>
  )
}
