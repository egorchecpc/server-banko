export interface StageData {
  balance: string
  reserve: string
  percent: string
}

interface TotalData {
  balance: string
  reserve: string
}

interface CreditData {
  creditType: string
  stage1: StageData
  stage2: StageData
  stage3: StageData
  total: TotalData
}

export type ECLData = CreditData[]
