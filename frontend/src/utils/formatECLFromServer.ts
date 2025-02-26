import { ECLType } from '@/models/FormatedECL'
import { ECLData, StageData } from '@/models/ECL'

// Определяем интерфейсы для обеих структур данных
interface BaseECLItem {
  grossCarryingAmount: number
  estimatedReservation: number
  reservationPercentage: number
}

interface ProductECLItem extends BaseECLItem {
  product: string | null
}

interface DelayECLItem extends BaseECLItem {
  delay: string | null
}

// Объединенный тип для обоих форматов данных
type ECLItem = ProductECLItem | DelayECLItem

// Структура ECL данных с обобщенным типом элементов
interface GenericECLData<T extends ECLItem> {
  stage1: T[]
  stage2: T[]
  stage3: T[]
  stageSummary: T[]
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
  data: GenericECLData<ECLItem>,
  type: ECLType = ECLType.PRODUCT
): ECLData => {
  // Проверка структуры данных и определение ключа группировки
  const isProductStructure = 'product' in (data.stage1[0] || {})
  const isDelayStructure = 'delay' in (data.stage1[0] || {})

  const groupingKey =
    isProductStructure && type === ECLType.PRODUCT
      ? 'product'
      : isDelayStructure
        ? 'delay'
        : null

  if (!groupingKey) {
    console.error('Неизвестная структура данных:', data)
    return []
  }

  // Собираем все уникальные ключи группировки
  const groupKeys = new Set<string>()
  ;[data.stage1, data.stage2, data.stage3].forEach((stage) => {
    stage.forEach((item) => {
      const keyValue = (item as any)[groupingKey]
      if (keyValue !== null) {
        groupKeys.add(keyValue || 'Неизвестный продукт')
      }
    })
  })

  const transformedData: ECLData = Array.from(groupKeys)
    .filter((key) => key !== 'погашен')
    .map((groupKey) => {
      const getStageData = (stage: ECLItem[]): StageData => {
        const item = stage.find(
          (stageItem) =>
            ((stageItem as any)[groupingKey] || 'Неизвестный продукт') ===
            groupKey
        )

        return {
          balance: formatCurrency(item?.grossCarryingAmount || 0),
          reserve: formatCurrency(item?.estimatedReservation || 0),
          percent: formatPercent(item?.reservationPercentage || 0),
        }
      }

      const summaryItem = data.stageSummary.find(
        (item) =>
          ((item as any)[groupingKey] || 'Неизвестный продукт') === groupKey
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

  // Находим итоговые значения (обычно они с null в ключе группировки)
  const findTotalItem = (items: ECLItem[]): BaseECLItem => {
    const item = items.find((i) => (i as any)[groupingKey] === null)
    return (
      item || {
        grossCarryingAmount: 0,
        estimatedReservation: 0,
        reservationPercentage: 0,
      }
    )
  }

  const totalValues = {
    stage1: findTotalItem(data.stage1),
    stage2: findTotalItem(data.stage2),
    stage3: findTotalItem(data.stage3),
    summary: findTotalItem(data.stageSummary),
  }

  // Добавляем строку с итогами
  transformedData.push({
    creditType: 'Итого',
    stage1: {
      balance: formatCurrency(totalValues.stage1.grossCarryingAmount),
      reserve: formatCurrency(totalValues.stage1.estimatedReservation),
      percent: formatPercent(totalValues.stage1.reservationPercentage),
    },
    stage2: {
      balance: formatCurrency(totalValues.stage2.grossCarryingAmount),
      reserve: formatCurrency(totalValues.stage2.estimatedReservation),
      percent: formatPercent(totalValues.stage2.reservationPercentage),
    },
    stage3: {
      balance: formatCurrency(totalValues.stage3.grossCarryingAmount),
      reserve: formatCurrency(totalValues.stage3.estimatedReservation),
      percent: formatPercent(totalValues.stage3.reservationPercentage),
    },
    total: {
      balance: formatCurrency(totalValues.summary.grossCarryingAmount),
      reserve: formatCurrency(totalValues.summary.estimatedReservation),
    },
  })

  return transformedData
}
