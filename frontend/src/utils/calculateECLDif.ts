import { ECLData } from '@/models/ECL'

export interface ECLDiffResult {
  creditType: string
  stage1: StageDiff
  stage2: StageDiff
  stage3: StageDiff
  total: TotalDiff
  products?: ProductDiff[] | null
}

export interface ProductDiff {
  product: string
  grossCarryingAmount: number
  estimatedReservation: number
  reservationPercentage: number
}

export interface StageDiff {
  balance: number
  reserve: number
  percent: number
}

interface TotalDiff {
  balance: number
  reserve: number
}

function parseNumber(str: string): number {
  return parseFloat(str.replace(/\s/g, '').replace(',', '.'))
}

function parsePercent(str: string): number {
  return parseFloat(str.replace('%', ''))
}

export function calculateECLDiff(
  oldECL: ECLData[],
  newECL: ECLData[],
  isECLv1: boolean = false
): ECLDiffResult[] {
  return newECL.map((newItem) => {
    const oldItem = oldECL.find(
      (item) => item.creditType === newItem.creditType
    )

    if (!oldItem) {
      return {
        creditType: newItem.creditType,
        stage1: {
          balance: parseNumber(newItem.stage1.balance),
          reserve: 0, // 0% изменения, если нет предыдущего значения
          percent: parsePercent(newItem.stage1.percent),
        },
        stage2: {
          balance: parseNumber(newItem.stage2.balance),
          reserve: 0,
          percent: parsePercent(newItem.stage2.percent),
        },
        stage3: {
          balance: parseNumber(newItem.stage3.balance),
          reserve: 0,
          percent: parsePercent(newItem.stage3.percent),
        },
        total: {
          balance: parseNumber(newItem.total.balance),
          reserve: 0,
        },
        // Добавляем объекты products только для ECLv1
        ...(isECLv1 && newItem.products
          ? { products: calculateProductsDiff([], newItem.products) }
          : {}),
      }
    }

    const calculateReservePercentChange = (
      newValue: string,
      oldValue: string
    ) => {
      const newNum = parseNumber(newValue)
      const oldNum = parseNumber(oldValue)
      if (oldNum === 0) return 0
      return ((newNum - oldNum) / oldNum) * 100
    }

    return {
      creditType: newItem.creditType,
      stage1: {
        balance:
          parseNumber(newItem.stage1.balance) -
          parseNumber(oldItem.stage1.balance),
        reserve: calculateReservePercentChange(
          newItem.stage1.reserve,
          oldItem.stage1.reserve
        ),
        percent:
          parsePercent(newItem.stage1.percent) -
          parsePercent(oldItem.stage1.percent),
      },
      stage2: {
        balance:
          parseNumber(newItem.stage2.balance) -
          parseNumber(oldItem.stage2.balance),
        reserve: calculateReservePercentChange(
          newItem.stage2.reserve,
          oldItem.stage2.reserve
        ),
        percent:
          parsePercent(newItem.stage2.percent) -
          parsePercent(oldItem.stage2.percent),
      },
      stage3: {
        balance:
          parseNumber(newItem.stage3.balance) -
          parseNumber(oldItem.stage3.balance),
        reserve: calculateReservePercentChange(
          newItem.stage3.reserve,
          oldItem.stage3.reserve
        ),
        percent:
          parsePercent(newItem.stage3.percent) -
          parsePercent(oldItem.stage3.percent),
      },
      total: {
        balance:
          parseNumber(newItem.total.balance) -
          parseNumber(oldItem.total.balance),
        reserve: calculateReservePercentChange(
          newItem.total.reserve,
          oldItem.total.reserve
        ),
      },
      // Добавляем расчет разницы для продуктов только для ECLv1
      ...(isECLv1 && newItem.products && oldItem.products
        ? {
            products: calculateProductsDiff(oldItem.products, newItem.products),
          }
        : {}),
    }
  })
}

// Функция для расчета разницы между продуктами
// Функция для расчета разницы между продуктами
function calculateProductsDiff(
  oldProducts: any[] = [],
  newProducts: any[],
  isECLv1: boolean = true
): ProductDiff[] {
  return newProducts.map((newProduct) => {
    const oldProduct = oldProducts.find(
      (product) => product.product === newProduct.product
    )

    if (!oldProduct) {
      // Для ECLv1 добавляем данные по стадиям
      if (isECLv1) {
        return {
          product: newProduct.product,
          grossCarryingAmount: newProduct.grossCarryingAmount,
          estimatedReservation: 0, // 0% изменения
          reservationPercentage: newProduct.reservationPercentage,
          stage1Data: {
            grossCarryingAmount:
              newProduct.stage1Data?.grossCarryingAmount || 0,
            estimatedReservation: 0,
            reservationPercentage:
              newProduct.stage1Data?.reservationPercentage || 0,
          },
          stage2Data: {
            grossCarryingAmount:
              newProduct.stage2Data?.grossCarryingAmount || 0,
            estimatedReservation: 0,
            reservationPercentage:
              newProduct.stage2Data?.reservationPercentage || 0,
          },
          stage3Data: {
            grossCarryingAmount:
              newProduct.stage3Data?.grossCarryingAmount || 0,
            estimatedReservation: 0,
            reservationPercentage:
              newProduct.stage3Data?.reservationPercentage || 0,
          },
        }
      } else {
        // Для ECLv2 оставляем прежнюю структуру
        return {
          product: newProduct.product,
          grossCarryingAmount: newProduct.grossCarryingAmount,
          estimatedReservation: 0, // 0% изменения
          reservationPercentage: newProduct.reservationPercentage,
        }
      }
    }

    const calculateReservationChange = (newValue: number, oldValue: number) => {
      if (oldValue === 0) return 0
      return ((newValue - oldValue) / oldValue) * 100
    }

    // Базовый результат, общий для ECLv1 и ECLv2
    const result = {
      product: newProduct.product,
      grossCarryingAmount:
        newProduct.grossCarryingAmount - oldProduct.grossCarryingAmount,
      estimatedReservation: calculateReservationChange(
        newProduct.estimatedReservation,
        oldProduct.estimatedReservation
      ),
      reservationPercentage:
        newProduct.reservationPercentage - oldProduct.reservationPercentage,
    }

    // Для ECLv1 добавляем данные по стадиям
    if (isECLv1) {
      return {
        ...result,
        stage1Data: {
          grossCarryingAmount:
            (newProduct.stage1Data?.grossCarryingAmount || 0) -
            (oldProduct.stage1Data?.grossCarryingAmount || 0),
          estimatedReservation: calculateReservationChange(
            newProduct.stage1Data?.estimatedReservation || 0,
            oldProduct.stage1Data?.estimatedReservation || 0
          ),
          reservationPercentage:
            (newProduct.stage1Data?.reservationPercentage || 0) -
            (oldProduct.stage1Data?.reservationPercentage || 0),
        },
        stage2Data: {
          grossCarryingAmount:
            (newProduct.stage2Data?.grossCarryingAmount || 0) -
            (oldProduct.stage2Data?.grossCarryingAmount || 0),
          estimatedReservation: calculateReservationChange(
            newProduct.stage2Data?.estimatedReservation || 0,
            oldProduct.stage2Data?.estimatedReservation || 0
          ),
          reservationPercentage:
            (newProduct.stage2Data?.reservationPercentage || 0) -
            (oldProduct.stage2Data?.reservationPercentage || 0),
        },
        stage3Data: {
          grossCarryingAmount:
            (newProduct.stage3Data?.grossCarryingAmount || 0) -
            (oldProduct.stage3Data?.grossCarryingAmount || 0),
          estimatedReservation: calculateReservationChange(
            newProduct.stage3Data?.estimatedReservation || 0,
            oldProduct.stage3Data?.estimatedReservation || 0
          ),
          reservationPercentage:
            (newProduct.stage3Data?.reservationPercentage || 0) -
            (oldProduct.stage3Data?.reservationPercentage || 0),
        },
      }
    } else {
      // Для ECLv2 возвращаем базовый результат без дополнительных полей
      return result
    }
  })
}
