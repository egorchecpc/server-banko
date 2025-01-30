export interface ECLStageItem {
  product: string
  delay: string
  grossCarryingAmount: number
  estimatedReservation: number
  reservationPercentage: number
}

export interface FormatedECL {
  stage1: ECLStageItem[]
  stage2: ECLStageItem[]
  stage3: ECLStageItem[]
  stageSummary: ECLStageItem[]
  totalGrossCarryingAmount: number
  totalEstimatedReservation: number
  totalReservationPercentage: number
}

export enum ECLType {
  PRODUCT = 'product',
  DELAY = 'delay',
}
