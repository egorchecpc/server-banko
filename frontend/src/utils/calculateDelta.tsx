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
  return (
    <span>
      {`${(value * 100).toFixed(2)}%`}
      <span
        className={`ml-1 ${deltaPercentage > 0 ? 'text-red-500' : 'text-green-500'}`}
      >
        ({`${Math.abs(deltaPercentage).toFixed(2)}%`}
        {delta > 0 ? '↑' : '↓'})
      </span>
    </span>
  )
}
