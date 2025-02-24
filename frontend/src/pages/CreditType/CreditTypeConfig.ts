import { DebtorTypeOption } from '@/components/TypeSelector/TypeSelector'
import { ConsumerIcon } from '@/pages/CreditType/icons/consumer'
import { MortgageIcon } from '@/pages/CreditType/icons/mortgage'
import { OverdraftIcon } from '@/pages/CreditType/icons/overdraft'
import { CardsIcon } from '@/pages/CreditType/icons/cards'

export const DEBTOR_TYPES: DebtorTypeOption[] = [
  {
    id: 'consumer',
    title: 'Потребительские',
    icon: ConsumerIcon,
  },
  {
    id: 'mortgage',
    title: 'Ипотечные',
    icon: MortgageIcon,
  },
  {
    id: 'overdraft',
    title: 'Овердрафт',
    icon: OverdraftIcon,
  },
  {
    id: 'cards',
    title: 'Кредитные карты',
    icon: CardsIcon,
  },
]
