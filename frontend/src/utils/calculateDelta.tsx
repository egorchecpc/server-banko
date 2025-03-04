export const calculateDelta = (
  current: number | undefined,
  previous: number | undefined
) => {
  if (current === undefined || previous === undefined) return null
  const delta = current - previous
  return { value: current, delta, isIncrease: delta > 0 }
}

export const renderCellWithDelta = (
  value: number,
  delta: number | null
): JSX.Element | string => {
  if (delta === null) return `${(value * 100).toFixed(2)}%`
  const deltaPercentage = delta * 100

  // Определяем цвет и стрелку в зависимости от значения дельты
  let colorClass = ''
  let arrow = ''

  if (delta > 0) {
    colorClass = 'text-red-500'
    arrow = '↑'
  } else if (delta < 0) {
    colorClass = 'text-green-500'
    arrow = '↓'
  } else {
    // дельта равна 0
    colorClass = 'text-yellow-500'
    arrow = '→'
  }

  return (
    <span>
      {`${(value * 100).toFixed(2)}%`}
      <span className={`ml-1 ${colorClass}`}>
        ({`${Math.abs(deltaPercentage).toFixed(2)}%`} {arrow})
      </span>
    </span>
  )
}
