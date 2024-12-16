export const mockYearlyData = (years) => {
    return years.map((year) => ({
      date: `${year}`,
      without: +(Math.random() * 100).toFixed(2),
      between1To30: +(Math.random() * 50).toFixed(2),
      between31To60: +(Math.random() * 30).toFixed(2),
      between61To90: +(Math.random() * 20).toFixed(2),
      moreThen90Percent: +(Math.random() * 10).toFixed(2),
    }))
  }
  

export const cPDDataYear = mockYearlyData([2023, 2024, 2025, 2026, 2027])
export const mPDDataYear = mockYearlyData([2023, 2024, 2025, 2026, 2027])

console.log(cPDDataYear)
