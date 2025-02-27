import {
  ForecastDataResponse,
  QuarterlyDataResponse,
  YearlyDataResponse,
} from '@/models/PD'

/**
 * Функция для обработки данных типа YearlyDataResponse
 * Домножает каждое числовое поле (кроме moreThen90) на случайный коэффициент от 0.8 до 1.2
 */
export function processYearlyData(
  data: YearlyDataResponse
): YearlyDataResponse {
  // Глубокое клонирование объекта
  const processedData = JSON.parse(JSON.stringify(data)) as YearlyDataResponse

  for (const year in processedData) {
    if (processedData.hasOwnProperty(year) && processedData[year].cpd) {
      const pdItem = processedData[year].cpd

      // Обрабатываем числовые поля, кроме moreThen90
      pdItem.without *= getRandomMultiplier()
      pdItem.between1To30 *= getRandomMultiplier()
      pdItem.between31To60 *= getRandomMultiplier()
      pdItem.between61To90 *= getRandomMultiplier()
      // moreThen90 оставляем без изменений
    }
  }

  return processedData
}

/**
 * Функция для обработки квартальных данных в формате, который приходит с бэкенда
 */
export function processQuarterlyData(data: any): any {
  // Глубокое клонирование объекта
  const processedData = JSON.parse(JSON.stringify(data))

  // Проходим по всем годам
  for (const yearKey in processedData) {
    if (
      processedData.hasOwnProperty(yearKey) &&
      Array.isArray(processedData[yearKey])
    ) {
      // Для каждого элемента в массиве года
      processedData[yearKey] = processedData[yearKey].map((item: any) => {
        // Создаем копию элемента
        const newItem = { ...item }

        // Домножаем все числовые поля кроме moreThen90 и mpdMoreThen90
        if (typeof newItem.without === 'number') {
          newItem.without *= getRandomMultiplier()
        }
        if (typeof newItem.between1To30 === 'number') {
          newItem.between1To30 *= getRandomMultiplier()
        }
        if (typeof newItem.between31To60 === 'number') {
          newItem.between31To60 *= getRandomMultiplier()
        }
        if (typeof newItem.between61To90 === 'number') {
          newItem.between61To90 *= getRandomMultiplier()
        }

        // Также обрабатываем mpd поля, если они есть
        if (typeof newItem.mpdWithout === 'number') {
          newItem.mpdWithout *= getRandomMultiplier()
        }
        if (typeof newItem.mpdBetween1To30 === 'number') {
          newItem.mpdBetween1To30 *= getRandomMultiplier()
        }
        if (typeof newItem.mpdBetween31To60 === 'number') {
          newItem.mpdBetween31To60 *= getRandomMultiplier()
        }
        if (typeof newItem.mpdBetween61To90 === 'number') {
          newItem.mpdBetween61To90 *= getRandomMultiplier()
        }

        return newItem
      })
    }
  }

  return processedData
}

/**
 * Функция для обработки данных типа ForecastDataResponse
 * Домножает каждое числовое поле (кроме moreThen90) на случайный коэффициент от 0.8 до 1.2
 */
export function processForecastData(
  data: ForecastDataResponse
): ForecastDataResponse {
  // Глубокое клонирование объекта
  const processedData = JSON.parse(JSON.stringify(data)) as ForecastDataResponse

  for (const year in processedData) {
    if (processedData.hasOwnProperty(year)) {
      // Обрабатываем массив cpd
      if (processedData[year].cpd) {
        processedData[year].cpd = processedData[year].cpd.map((pdItem) => {
          // Обрабатываем числовые поля, кроме moreThen90
          pdItem.without *= getRandomMultiplier()
          pdItem.between1To30 *= getRandomMultiplier()
          pdItem.between31To60 *= getRandomMultiplier()
          pdItem.between61To90 *= getRandomMultiplier()
          // moreThen90 оставляем без изменений

          return pdItem
        })
      }

      // Обрабатываем массив mpd
      if (processedData[year].mpd) {
        processedData[year].mpd = processedData[year].mpd.map((pdItem) => {
          // Обрабатываем числовые поля, кроме moreThen90
          pdItem.without *= getRandomMultiplier()
          pdItem.between1To30 *= getRandomMultiplier()
          pdItem.between31To60 *= getRandomMultiplier()
          pdItem.between61To90 *= getRandomMultiplier()
          // moreThen90 оставляем без изменений

          return pdItem
        })
      }
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
