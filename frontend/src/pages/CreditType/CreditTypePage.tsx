import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import {
  DebtorType,
  DebtorTypeSelector,
} from '@/components/TypeSelector/TypeSelector'
import { DEBTOR_TYPES } from '@/pages/CreditType/CreditTypeConfig'

export const CreditTypePage = () => {
  const [selectedType, setSelectedType] = useState<DebtorType | null>(null)
  const navigate = useNavigate()
  const search: { id: string } = useSearch({
    strict: false,
  })
  const handleContinue = () => {
    if (selectedType) {
      navigate({
        to: `/reports/${search.id}/dashboard`,
        search: { type: selectedType },
      })
    }
  }

  return (
    <DebtorTypeSelector
      selectedType={selectedType}
      onTypeSelect={setSelectedType}
      onContinue={handleContinue}
      options={DEBTOR_TYPES}
    />
  )
}
