export function fixDate(date: string) {
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/
  const match = date.match(regex)

  if (!match) {
    throw new Error('Неверный формат даты. Ожидается YYYY-MM-DD.')
  }

  const [_, year, month, day] = match

  if (day !== '31') {
    return `${year}-${month}-31`
  }

  return date
}
