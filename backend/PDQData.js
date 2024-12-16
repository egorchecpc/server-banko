export const mockQuarterlyData = (years) => {
    return years.flatMap((year) => [
      { date: `${year}-Q1`, without: Math.random() * 100, between1To30: Math.random() * 50, between31To60: Math.random() * 30, between61To90: Math.random() * 20, moreThen90Percent: Math.random() * 10 },
      { date: `${year}-Q2`, without: Math.random() * 100, between1To30: Math.random() * 50, between31To60: Math.random() * 30, between61To90: Math.random() * 20, moreThen90Percent: Math.random() * 10 },
      { date: `${year}-Q3`, without: Math.random() * 100, between1To30: Math.random() * 50, between31To60: Math.random() * 30, between61To90: Math.random() * 20, moreThen90Percent: Math.random() * 10 },
      { date: `${year}-Q4`, without: Math.random() * 100, between1To30: Math.random() * 50, between31To60: Math.random() * 30, between61To90: Math.random() * 20, moreThen90Percent: Math.random() * 10 },
    ]);
  };
  
  export const cPDQuarterlyData = mockQuarterlyData([2023, 2024]);
  export const mPDQuarterlyData = mockQuarterlyData([2023, 2024, 2025, 2026, 2027]);
  
console.log("pdq: ", cPDQuarterlyData)