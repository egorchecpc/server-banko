// utils/downloadUtils.ts

/**
 * Функция для скачивания Excel файла из статического пути
 * @param filePath - путь к Excel файлу в проекте
 * @param fileName - название файла для скачивания
 */
export const downloadExcelFile = (filePath: string, fileName: string) => {
  fetch(filePath)
    .then((response) => {
      console.log('Content-Type:', response.headers.get('content-type')) // Отладка
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }
      return response.arrayBuffer() // Используем arrayBuffer вместо blob
    })
    .then((buffer) => {
      // Создаем Blob с правильным MIME-типом
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    })
    .catch((error) => {
      console.error('Ошибка при скачивании файла:', error)
    })
}

// Пример использования:
// import { downloadExcelFile } from './utils/downloadUtils';
// downloadExcelFile('/static/data/report.xlsx', 'Отчет.xlsx');
