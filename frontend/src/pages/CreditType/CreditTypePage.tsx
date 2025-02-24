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
  const search: { id: string; type: string } = useSearch({
    strict: false,
  })
  const handleContinue = () => {
    if (selectedType) {
      if (search.type === 'new') {
        navigate({
          to: `/reports/${search.id}/new-report`,
          search: { type: selectedType },
        })
      } else {
        navigate({
          to: `/reports/${search.id}/dashboard`,
          search: { type: selectedType },
        })
      }
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
