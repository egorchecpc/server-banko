import { ECLStageItem, ECLType, FormatedECL } from '@/models/FormatedECL'
import { ECLData, StageData } from '@/models/ECL'

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
  data: FormatedECL,
  type: ECLType = ECLType.PRODUCT
): ECLData => {
  const groupKeys = new Set<string>()
  ;[data.stage1, data.stage2, data.stage3].forEach((stage) => {
    stage.forEach((item) => {
      if (type === ECLType.DELAY) {
        groupKeys.add(item.delay)
      } else {
        groupKeys.add(item.product || 'Неизвестный продукт')
      }
    })
  })

  const transformedData: ECLData = Array.from(groupKeys)
    .filter((key) => key !== 'погашен')
    .map((groupKey) => {
      const getStageData = (stage: ECLStageItem[]): StageData => {
        const item = stage.find((item) =>
          type === ECLType.DELAY
            ? item.delay === groupKey
            : (item.product || 'Неизвестный продукт') === groupKey
        )

        return {
          balance: formatCurrency(item?.grossCarryingAmount || 0),
          reserve: formatCurrency(item?.estimatedReservation || 0),
          percent: formatPercent(item?.reservationPercentage || 0),
        }
      }

      const summaryItem = data.stageSummary.find((item) =>
        type === ECLType.DELAY
          ? item.delay === groupKey
          : (item.product || 'Неизвестный продукт') === groupKey
      )

      return {
        creditType: groupKey,
        stage1: getStageData(data.stage1),
        stage2: getStageData(data.stage2),
        stage3: getStageData(data.stage3),
        total: {
          balance: formatCurrency(summaryItem?.grossCarryingAmount || 0),
          reserve: formatCurrency(summaryItem?.estimatedReservation || 0),
        },
      }
    })

  transformedData.push({
    creditType: 'Итого',
    stage1: {
      balance: formatCurrency(data.totalGrossCarryingAmount),
      reserve: formatCurrency(data.totalEstimatedReservation),
      percent: formatPercent(data.totalReservationPercentage),
    },
    stage2: {
      balance: formatCurrency(data.totalGrossCarryingAmount),
      reserve: formatCurrency(data.totalEstimatedReservation),
      percent: formatPercent(data.totalReservationPercentage),
    },
    stage3: {
      balance: formatCurrency(data.totalGrossCarryingAmount),
      reserve: formatCurrency(data.totalEstimatedReservation),
      percent: formatPercent(data.totalReservationPercentage),
    },
    total: {
      balance: formatCurrency(data.totalGrossCarryingAmount),
      reserve: formatCurrency(data.totalEstimatedReservation),
    },
  })

  return transformedData
}
