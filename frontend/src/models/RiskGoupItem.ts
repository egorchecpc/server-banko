export interface RiskGroupItem {
  risk: string
  stage1: number
  stage2: number
  stage3: number
  poci: number
  total: number
}

export interface RiskGroupItemFormatted {
  risk: string
  stage1: string
  stage2: string
  stage3: string
  poci: string
  total: string
}
