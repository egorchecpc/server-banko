/**
 * Функция для обработки данных LGD
 * Домножает каждое числовое значение (кроме последней категории)
 * на случайный коэффициент от 0.8 до 1.2
 *
 * @param data - Массив данных LGD
 * @returns Обработанные данные LGD
 */
export function processLgdData(data: any[]): any[] {
  // Глубокое клонирование объекта
  const processedData = JSON.parse(JSON.stringify(data))

  // Проходим по всем элементам кроме последнего
  for (let i = 0; i < processedData.length - 1; i++) {
    const item = processedData[i]

    // Проверяем наличие массива quarters
    if (item && Array.isArray(item.quarters)) {
      // Обрабатываем каждый элемент в массиве quarters
      item.quarters = item.quarters.map((quarter: string) => {
        // Удаляем символ % и преобразуем в число
        const numValue = parseFloat(quarter.replace('%', ''))

        if (!isNaN(numValue)) {
          // Применяем случайный множитель
          const newValue = numValue * getRandomMultiplier()
          // Форматируем обратно в строку с процентом и двумя десятичными знаками
          return newValue.toFixed(2) + '%'
        }

        // Если не удалось преобразовать в число, возвращаем исходное значение
        return quarter
      })
    }
  }

  return processedData
}

/**
 * Вспомогательная функция для генерации случайного множителя от 0.8 до 1.2
 */
function getRandomMultiplier(): number {
  return 0.8 + Math.random() * 0.4 // Генерирует случайное число от 0.8 до 1.2
}
