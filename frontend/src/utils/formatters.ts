import { RiskGroupItem, RiskGroupItemFormatted } from '@/models/RiskGoupItem'

export const formatCurrency = (value: number): string => {
  return value.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const formatAsCurrency = (
  data?: RiskGroupItem[]
): RiskGroupItemFormatted[] | undefined => {
  return data?.map((item) => ({
    ...item,
    stage1: formatCurrency(item.stage1),
    stage2: formatCurrency(item.stage2),
    stage3: formatCurrency(item.stage3),
    poci: formatCurrency(item.poci),
    total: formatCurrency(item.total),
  }))
}

export const formatAsPercent = (
  data?: RiskGroupItem[]
): RiskGroupItemFormatted[] | undefined => {
  return data?.map((item) => ({
    risk: item.risk,
    stage1: `${(item.stage1 * 100).toFixed(2)}%`,
    stage2: `${(item.stage2 * 100).toFixed(2)}%`,
    stage3: `${(item.stage3 * 100).toFixed(2)}%`,
    poci: `${(item.poci * 100).toFixed(2)}%`,
    total: `${(item.total * 100).toFixed(2)}%`,
  }))
}
