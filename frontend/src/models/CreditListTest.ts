interface PageableSort {
  direction: string
  nullHandling: string
  ascending: boolean
  property: string
  ignoreCase: boolean
}

interface Pageable {
  offset: number
  sort: PageableSort[]
  paged: boolean
  pageNumber: number
  pageSize: number
  unpaged: boolean
}

export interface PaginatedResponse<T> {
  content: T[]
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: PageableSort[]
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: Pageable
  empty: boolean
}

export interface CreditListData {
  id: string
  clientId: string
  currency: string
  ownerType: string
  product: string
  creditType: string
  stage: string
  date: string
  loanRepaymentDate: string
  grossCarryingAmount: number
  lgd: number
  prepaymentRate: number
  expectedCreditLossesAmount: number
  reservationPercentage: number
  mpd: number
}
