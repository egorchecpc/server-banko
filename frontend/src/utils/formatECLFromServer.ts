import { ECLType } from '@/models/FormatedECL'
import { ECLData, StageData } from '@/models/ECL'

// Определяем интерфейсы для обеих структур данных
interface BaseECLItem {
  grossCarryingAmount: number
  estimatedReservation: number
  reservationPercentage: number
  products?: BaseECLItem[] | null
  creditType?: string | null
  delay?: string | null
}

const formatCurrency = (value: number): string => {
  return value.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`
}

export const transformECLDataFromServer = (
  data: {
    stage1: BaseECLItem[]
    stage2: BaseECLItem[]
    stage3: BaseECLItem[]
    stageSummary: BaseECLItem[]
  },
  type: ECLType = ECLType.PRODUCT
): ECLData => {
  if (type === ECLType.PRODUCT) {
    // Логика для продуктов (существующая)
    const creditTypes = new Set<string>()
    data.stage1.forEach((item) => {
      if (item.creditType && item.creditType !== 'погашен') {
        creditTypes.add(item.creditType)
      }
    })

    const transformedData: ECLData = Array.from(creditTypes).map(
      (creditType) => {
        const getStageData = (stage: BaseECLItem[]): StageData => {
          const stageItem = stage.find((item) => item.creditType === creditType)
          return {
            balance: formatCurrency(stageItem?.grossCarryingAmount || 0),
            reserve: formatCurrency(stageItem?.estimatedReservation || 0),
            percent: formatPercent(stageItem?.reservationPercentage || 0),
          }
        }

        const summaryItem = data.stageSummary.find(
          (item) => item.creditType === creditType
        )

        const result: any = {
          creditType,
          stage1: getStageData(data.stage1),
          stage2: getStageData(data.stage2),
          stage3: getStageData(data.stage3),
          total: {
            balance: formatCurrency(summaryItem?.grossCarryingAmount || 0),
            reserve: formatCurrency(summaryItem?.estimatedReservation || 0),
          },
          products:
            data.stage1.find((item) => item.creditType === creditType)
              ?.products || [],
        }

        return result
      }
    )

    // Добавляем итоговую строку
    const totalItem = data.stageSummary.find((item) => item.creditType === null)
    if (totalItem) {
      transformedData.push({
        creditType: 'Итого',
        stage1: {
          balance: formatCurrency(totalItem.grossCarryingAmount),
          reserve: formatCurrency(totalItem.estimatedReservation),
          percent: formatPercent(totalItem.reservationPercentage),
        },
        stage2: {
          balance: formatCurrency(
            data.stage2.find((item) => item.creditType === null)
              ?.grossCarryingAmount || 0
          ),
          reserve: formatCurrency(
            data.stage2.find((item) => item.creditType === null)
              ?.estimatedReservation || 0
          ),
          percent: formatPercent(
            data.stage2.find((item) => item.creditType === null)
              ?.reservationPercentage || 0
          ),
        },
        stage3: {
          balance: formatCurrency(
            data.stage3.find((item) => item.creditType === null)
              ?.grossCarryingAmount || 0
          ),
          reserve: formatCurrency(
            data.stage3.find((item) => item.creditType === null)
              ?.estimatedReservation || 0
          ),
          percent: formatPercent(
            data.stage3.find((item) => item.creditType === null)
              ?.reservationPercentage || 0
          ),
        },
        total: {
          balance: formatCurrency(totalItem.grossCarryingAmount),
          reserve: formatCurrency(totalItem.estimatedReservation),
        },
      })
    }

    return transformedData
  } else {
    // Логика для задержек
    const creditTypes = [
      'без просрочки',
      '1-30 дней',
      '31-60 дней',
      '61-90 дней',
      'свыше 90 дней',
    ]

    const transformedData: ECLData = creditTypes.map((creditType) => {
      const getStageData = (stage: BaseECLItem[]): StageData => {
        const stageItem = stage.find((item) => item.delay === creditType)
        return {
          balance: formatCurrency(stageItem?.grossCarryingAmount || 0),
          reserve: formatCurrency(stageItem?.estimatedReservation || 0),
          percent: formatPercent(stageItem?.reservationPercentage || 0),
        }
      }

      const result: any = {
        creditType,
        stage1: getStageData(data.stage1),
        stage2: getStageData(data.stage2),
        stage3: getStageData(data.stage3),
        total: {
          balance: formatCurrency(
            (data.stage1.find((item) => item.delay === creditType)
              ?.grossCarryingAmount || 0) +
              (data.stage2.find((item) => item.delay === creditType)
                ?.grossCarryingAmount || 0) +
              (data.stage3.find((item) => item.delay === creditType)
                ?.grossCarryingAmount || 0)
          ),
          reserve: formatCurrency(
            (data.stage1.find((item) => item.delay === creditType)
              ?.estimatedReservation || 0) +
              (data.stage2.find((item) => item.delay === creditType)
                ?.estimatedReservation || 0) +
              (data.stage3.find((item) => item.delay === creditType)
                ?.estimatedReservation || 0)
          ),
        },
      }

      return result
    })

    // Добавляем итоговую строку
    const totalItem = data.stageSummary.find((item) => item.delay === null)
    if (totalItem) {
      transformedData.push({
        creditType: 'Итого',
        stage1: {
          balance: formatCurrency(totalItem.grossCarryingAmount),
          reserve: formatCurrency(totalItem.estimatedReservation),
          percent: formatPercent(totalItem.reservationPercentage),
        },
        stage2: {
          balance: formatCurrency(
            data.stage2.find((item) => item.delay === null)
              ?.grossCarryingAmount || 0
          ),
          reserve: formatCurrency(
            data.stage2.find((item) => item.delay === null)
              ?.estimatedReservation || 0
          ),
          percent: formatPercent(
            data.stage2.find((item) => item.delay === null)
              ?.reservationPercentage || 0
          ),
        },
        stage3: {
          balance: formatCurrency(
            data.stage3.find((item) => item.delay === null)
              ?.grossCarryingAmount || 0
          ),
          reserve: formatCurrency(
            data.stage3.find((item) => item.delay === null)
              ?.estimatedReservation || 0
          ),
          percent: formatPercent(
            data.stage3.find((item) => item.delay === null)
              ?.reservationPercentage || 0
          ),
        },
        total: {
          balance: formatCurrency(totalItem.grossCarryingAmount),
          reserve: formatCurrency(totalItem.estimatedReservation),
        },
      })
    }

    return transformedData
  }
}
