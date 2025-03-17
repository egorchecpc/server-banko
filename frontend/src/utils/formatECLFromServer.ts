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
    // Логика для продуктов (исправленная)
    const creditTypes = new Set<string>()
    data.stage1.forEach((item) => {
      if (item.creditType && item.creditType !== 'погашен') {
        creditTypes.add(item.creditType)
      }
    })
    data.stage2.forEach((item) => {
      if (item.creditType && item.creditType !== 'погашен') {
        creditTypes.add(item.creditType)
      }
    })
    data.stage3.forEach((item) => {
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

        // Получаем продукты из каждой стадии
        const stage1Products =
          data.stage1.find((item) => item.creditType === creditType)
            ?.products || []

        const stage2Products =
          data.stage2.find((item) => item.creditType === creditType)
            ?.products || []

        const stage3Products =
          data.stage3.find((item) => item.creditType === creditType)
            ?.products || []

        // Объединяем все уникальные продукты из всех стадий
        const allProductNames = new Set<string>()

        // Добавляем имена продуктов из всех стадий
        stage1Products.forEach((product) => {
          if (product.product) allProductNames.add(product.product)
        })
        stage2Products.forEach((product) => {
          if (product.product) allProductNames.add(product.product)
        })
        stage3Products.forEach((product) => {
          if (product.product) allProductNames.add(product.product)
        })

        // Создаем объект для каждого уникального продукта со всеми его стадиями
        const combinedProducts = Array.from(allProductNames).map(
          (productName) => {
            // Находим данные продукта для каждой стадии
            const stage1Product = stage1Products.find(
              (p) => p.product === productName
            )
            const stage2Product = stage2Products.find(
              (p) => p.product === productName
            )
            const stage3Product = stage3Products.find(
              (p) => p.product === productName
            )

            // Сумма для итогов
            const totalGrossAmount =
              (stage1Product?.grossCarryingAmount || 0) +
              (stage2Product?.grossCarryingAmount || 0) +
              (stage3Product?.grossCarryingAmount || 0)

            const totalReservation =
              (stage1Product?.estimatedReservation || 0) +
              (stage2Product?.estimatedReservation || 0) +
              (stage3Product?.estimatedReservation || 0)

            // Создаем объект с данными продукта по всем стадиям
            return {
              product: productName,
              // Данные по стадиям
              stage1Data: stage1Product || {
                grossCarryingAmount: 0,
                estimatedReservation: 0,
                reservationPercentage: 0,
              },
              stage2Data: stage2Product || {
                grossCarryingAmount: 0,
                estimatedReservation: 0,
                reservationPercentage: 0,
              },
              stage3Data: stage3Product || {
                grossCarryingAmount: 0,
                estimatedReservation: 0,
                reservationPercentage: 0,
              },
              // Общие данные для итогов
              grossCarryingAmount: totalGrossAmount,
              estimatedReservation: totalReservation,
              reservationPercentage:
                totalGrossAmount > 0 ? totalReservation / totalGrossAmount : 0,
            }
          }
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
          products: combinedProducts,
        }

        return result
      }
    )

    // Добавляем итоговую строку - ИСПРАВЛЕНО
    // Берем итоговые данные по каждой отдельной стадии
    const stage1Total = data.stage1.find((item) => item.creditType === null)
    const stage2Total = data.stage2.find((item) => item.creditType === null)
    const stage3Total = data.stage3.find((item) => item.creditType === null)
    const totalItem = data.stageSummary.find((item) => item.creditType === null)

    if (totalItem) {
      transformedData.push({
        creditType: 'Итого',
        stage1: {
          balance: formatCurrency(stage1Total?.grossCarryingAmount || 0),
          reserve: formatCurrency(stage1Total?.estimatedReservation || 0),
          percent: formatPercent(stage1Total?.reservationPercentage || 0),
        },
        stage2: {
          balance: formatCurrency(stage2Total?.grossCarryingAmount || 0),
          reserve: formatCurrency(stage2Total?.estimatedReservation || 0),
          percent: formatPercent(stage2Total?.reservationPercentage || 0),
        },
        stage3: {
          balance: formatCurrency(stage3Total?.grossCarryingAmount || 0),
          reserve: formatCurrency(stage3Total?.estimatedReservation || 0),
          percent: formatPercent(stage3Total?.reservationPercentage || 0),
        },
        total: {
          balance: formatCurrency(totalItem.grossCarryingAmount),
          reserve: formatCurrency(totalItem.estimatedReservation),
        },
      })
    }

    return transformedData
  } else {
    // Логика для задержек - аналогичное исправление для типа delay
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

    // Добавляем итоговую строку - ИСПРАВЛЕНО
    const stage1Total = data.stage1.find((item) => item.delay === null)
    const stage2Total = data.stage2.find((item) => item.delay === null)
    const stage3Total = data.stage3.find((item) => item.delay === null)

    // ИСПРАВЛЕНО: Корректное вычисление сумм с правильной расстановкой скобок
    // Используем данные из stageSummary, если они есть
    const totalSummary = data.stageSummary.find((item) => item.delay === null)

    // Если итоговая строка есть в stageSummary, используем ее
    if (totalSummary) {
      transformedData.push({
        creditType: 'Итого',
        stage1: {
          balance: formatCurrency(stage1Total?.grossCarryingAmount || 0),
          reserve: formatCurrency(stage1Total?.estimatedReservation || 0),
          percent: formatPercent(stage1Total?.reservationPercentage || 0),
        },
        stage2: {
          balance: formatCurrency(stage2Total?.grossCarryingAmount || 0),
          reserve: formatCurrency(stage2Total?.estimatedReservation || 0),
          percent: formatPercent(stage2Total?.reservationPercentage || 0),
        },
        stage3: {
          balance: formatCurrency(stage3Total?.grossCarryingAmount || 0),
          reserve: formatCurrency(stage3Total?.estimatedReservation || 0),
          percent: formatPercent(stage3Total?.reservationPercentage || 0),
        },
        total: {
          balance: formatCurrency(totalSummary.grossCarryingAmount),
          reserve: formatCurrency(totalSummary.estimatedReservation),
        },
      })
    } else {
      // Если итоговой строки нет, вычисляем суммы самостоятельно
      const totalGrossAmount =
        (stage1Total?.grossCarryingAmount || 0) +
        (stage2Total?.grossCarryingAmount || 0) +
        (stage3Total?.grossCarryingAmount || 0)

      const totalReservation =
        (stage1Total?.estimatedReservation || 0) +
        (stage2Total?.estimatedReservation || 0) +
        (stage3Total?.estimatedReservation || 0)

      transformedData.push({
        creditType: 'Итого',
        stage1: {
          balance: formatCurrency(stage1Total?.grossCarryingAmount || 0),
          reserve: formatCurrency(stage1Total?.estimatedReservation || 0),
          percent: formatPercent(stage1Total?.reservationPercentage || 0),
        },
        stage2: {
          balance: formatCurrency(stage2Total?.grossCarryingAmount || 0),
          reserve: formatCurrency(stage2Total?.estimatedReservation || 0),
          percent: formatPercent(stage2Total?.reservationPercentage || 0),
        },
        stage3: {
          balance: formatCurrency(stage3Total?.grossCarryingAmount || 0),
          reserve: formatCurrency(stage3Total?.estimatedReservation || 0),
          percent: formatPercent(stage3Total?.reservationPercentage || 0),
        },
        total: {
          balance: formatCurrency(totalGrossAmount),
          reserve: formatCurrency(totalReservation),
        },
      })
    }

    return transformedData
  }
}
