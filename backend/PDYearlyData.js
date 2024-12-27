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

export const cPDDataYear2 = {
  "year2023": {
    "cpd": {
      "date": "2023-12-01",
      "without": 6.29,
      "between1To30": 6.29,
      "between31To60": 16.29,
      "between61To90": 12.09,
      "moreThen90": 98.49
    },
    "mpd": {
      "date": "2023-12-01",
      "without": 6.29,
      "between1To30": 6.29,
      "between31To60": 16.29,
      "between61To90": 12.09,
      "moreThen90": 98.49
    }
  },
  "year2024": {
    "cpd": {
      "date": "2024-12-01",
      "without": 6.29,
      "between1To30": 6.29,
      "between31To60": 16.29,
      "between61To90": 12.09,
      "moreThen90": 98.49
    },
    "mpd": {
      "date": "2024-12-01",
      "without": 6.29,
      "between1To30": 6.29,
      "between31To60": 16.29,
      "between61To90": 12.09,
      "moreThen90": 98.49
    }
  },
  "year2025": {
    "cpd": {
      "date": "2025-12-01",
      "without": 6.29,
      "between1To30": 6.29,
      "between31To60": 16.29,
      "between61To90": 12.09,
      "moreThen90": 98.49
    },
    "mpd": {
      "date": "2025-12-01",
      "without": 6.29,
      "between1To30": 6.29,
      "between31To60": 16.29,
      "between61To90": 12.09,
      "moreThen90": 98.49
    }
  },
  "year2026": {
    "cpd": {
      "date": "2026-12-01",
      "without": 6.29,
      "between1To30": 6.29,
      "between31To60": 16.29,
      "between61To90": 12.09,
      "moreThen90": 98.49
    },
    "mpd": {
      "date": "2026-12-01",
      "without": 6.29,
      "between1To30": 6.29,
      "between31To60": 16.29,
      "between61To90": 12.09,
      "moreThen90": 98.49
    }
  },
  "year2027": {
    "cpd": {
      "date": "2027-12-01",
      "without": 6.29,
      "between1To30": 6.29,
      "between31To60": 16.29,
      "between61To90": 12.09,
      "moreThen90": 98.49
    },
    "mpd": {
      "date": "2027-12-01",
      "without": 6.29,
      "between1To30": 6.29,
      "between31To60": 16.29,
      "between61To90": 12.09,
      "moreThen90": 98.49
    }
  }

}

console.log(cPDDataYear)
