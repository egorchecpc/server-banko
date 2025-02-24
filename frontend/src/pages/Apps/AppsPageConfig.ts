import { RetailIcon } from './icons/retail'
import { CorpIcon } from './icons/corp'
import { BankIcon } from './icons/bank'
import { SuvIcon } from './icons/suv'
import { DebtorTypeOption } from '@/components/TypeSelector/TypeSelector'

export const DEBTOR_TYPES: DebtorTypeOption[] = [
  {
    id: 'retail',
    title: 'Розничный',
    icon: RetailIcon,
  },
  {
    id: 'corporate',
    title: 'Корпоративный',
    icon: CorpIcon,
  },
  {
    id: 'interbank',
    title: 'Межбанковский',
    icon: BankIcon,
  },
  {
    id: 'sovereign',
    title: 'Суверены',
    icon: SuvIcon,
  },
]
