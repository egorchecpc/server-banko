import { HeatmapData, NewHeatmapItem } from '@/models/Heatmap'

export function transformHeatmapData(data: NewHeatmapItem[]): {
  heatmapData: HeatmapData
} {
  // Извлекаем категории из данных
  const categories = data.map((item) => item.product)

  // Определяем фиксированные периоды
  const periods = ['Не просроченные', '0-30', '31-60', '61-90', '90+']

  // Преобразуем значения в массивы
  const values = data.map((item) => [
    item.without * 100,
    item.between1To30 * 100,
    item.between31To60 * 100,
    item.between61To90 * 100,
    item.moreThen90 * 100,
  ])

  return {
    heatmapData: {
      categories,
      periods,
      values,
    },
  }
}
