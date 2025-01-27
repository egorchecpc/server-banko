export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'млн'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'к'
  }
  return num.toString()
}
