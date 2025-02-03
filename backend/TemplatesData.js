export let templates = [
  {
    id: '1',
    name: 'Базовый шаблон',
    indicators: [
      {
        id: '1',
        type: 'productProfitability',
        values: {
          2024: {
            worst: { value: 6.2, probability: 30 },
            norm: { value: 6.3, probability: 50 },
            best: { value: 6.4, probability: 20 },
          },
          2025: {
            worst: { value: 6.3, probability: 30 },
            norm: { value: 6.4, probability: 50 },
            best: { value: 6.5, probability: 20 },
          },
          2026: {
            worst: { value: 6.5, probability: 30 },
            norm: { value: 6.6, probability: 50 },
            best: { value: 6.7, probability: 20 },
          },
          2027: {
            worst: { value: 6.6, probability: 30 },
            norm: { value: 6.7, probability: 50 },
            best: { value: 6.8, probability: 20 },
          },
        },
      },
      {
        id: '2',
        type: 'realWage',
        values: {
          2024: {
            worst: { value: 95, probability: 30 },
            norm: { value: 97, probability: 50 },
            best: { value: 99, probability: 20 },
          },
          2025: {
            worst: { value: 98, probability: 30 },
            norm: { value: 100, probability: 50 },
            best: { value: 102, probability: 20 },
          },
          2026: {
            worst: { value: 100, probability: 30 },
            norm: { value: 102, probability: 50 },
            best: { value: 104, probability: 20 },
          },
          2027: {
            worst: { value: 102, probability: 30 },
            norm: { value: 104, probability: 50 },
            best: { value: 106, probability: 20 },
          },
        },
      },
      {
        id: '3',
        type: 'gdp',
        values: {
          2024: {
            worst: { value: 217600.0, probability: 30 },
            norm: { value: 217800.0, probability: 50 },
            best: { value: 218000.0, probability: 20 },
          },
          2025: {
            worst: { value: 218900.0, probability: 30 },
            norm: { value: 219000.0, probability: 50 },
            best: { value: 219200.0, probability: 20 },
          },
          2026: {
            worst: { value: 221880.0, probability: 30 },
            norm: { value: 221890.0, probability: 50 },
            best: { value: 221900, probability: 20 },
          },
          2027: {
            worst: { value: 223981.0, probability: 30 },
            norm: { value: 223991.0, probability: 50 },
            best: { value: 224000.0, probability: 20 },
          },
        },
      },
      {
        id: '4',
        type: 'realDisposablePopulationIncome',
        values: {
          2024: {
            worst: { value: 100.5, probability: 30 },
            norm: { value: 105.1, probability: 50 },
            best: { value: 108, probability: 20 },
          },
          2025: {
            worst: { value: 99.8, probability: 30 },
            norm: { value: 104, probability: 50 },
            best: { value: 108.5, probability: 20 },
          },
          2026: {
            worst: { value: 99.9, probability: 30 },
            norm: { value: 104.5, probability: 50 },
            best: { value: 109.6, probability: 20 },
          },
          2027: {
            worst: { value: 100.3, probability: 30 },
            norm: { value: 105, probability: 50 },
            best: { value: 110.3, probability: 20 },
          },
        },
      },
      {
        id: '5',
        type: 'averageMonthlySalary',
        values: {
          2024: {
            worst: { value: 1860, probability: 30 },
            norm: { value: 1991.2, probability: 50 },
            best: { value: 2390, probability: 20 },
          },
          2025: {
            worst: { value: 2100, probability: 30 },
            norm: { value: 2420, probability: 50 },
            best: { value: 2790, probability: 20 },
          },
          2026: {
            worst: { value: 2230, probability: 30 },
            norm: { value: 2590, probability: 50 },
            best: { value: 2840, probability: 20 },
          },
          2027: {
            worst: { value: 2320, probability: 30 },
            norm: { value: 2620, probability: 50 },
            best: { value: 2980, probability: 20 },
          },
        },
      },
    ],
  },
  {
    id: '2',
    name: 'Расширенный шаблон',
    indicators: [
      {
        id: '6',
        type: 'productProfitability',
        values: {
          2025: {
            worst: { value: 2.0, probability: 30 },
            norm: { value: 3.0, probability: 50 },
            best: { value: 4.0, probability: 20 },
          },
          2026: {
            worst: { value: 2.3, probability: 30 },
            norm: { value: 3.3, probability: 50 },
            best: { value: 4.3, probability: 20 },
          },
          2027: {
            worst: { value: 2.5, probability: 30 },
            norm: { value: 3.5, probability: 50 },
            best: { value: 4.5, probability: 20 },
          },
          2028: {
            worst: { value: 2.7, probability: 30 },
            norm: { value: 3.7, probability: 50 },
            best: { value: 4.7, probability: 20 },
          },
        },
      },
      {
        id: '7',
        type: 'realWage',
        values: {
          2025: {
            worst: { value: 1.5, probability: 30 },
            norm: { value: 2.5, probability: 50 },
            best: { value: 3.5, probability: 20 },
          },
          2026: {
            worst: { value: 1.7, probability: 30 },
            norm: { value: 2.7, probability: 50 },
            best: { value: 3.7, probability: 20 },
          },
          2027: {
            worst: { value: 1.9, probability: 30 },
            norm: { value: 2.9, probability: 50 },
            best: { value: 3.9, probability: 20 },
          },
          2028: {
            worst: { value: 2.1, probability: 30 },
            norm: { value: 3.1, probability: 50 },
            best: { value: 4.1, probability: 20 },
          },
        },
      },
      {
        id: '8',
        type: 'gdp',
        values: {
          2025: {
            worst: { value: 2.5, probability: 30 },
            norm: { value: 3.5, probability: 50 },
            best: { value: 4.5, probability: 20 },
          },
          2026: {
            worst: { value: 2.7, probability: 30 },
            norm: { value: 3.7, probability: 50 },
            best: { value: 4.7, probability: 20 },
          },
          2027: {
            worst: { value: 2.9, probability: 30 },
            norm: { value: 3.9, probability: 50 },
            best: { value: 4.9, probability: 20 },
          },
          2028: {
            worst: { value: 3.1, probability: 30 },
            norm: { value: 4.1, probability: 50 },
            best: { value: 5.1, probability: 20 },
          },
        },
      },
      {
        id: '9',
        type: 'realDisposablePopulationIncome',
        values: {
          2025: {
            worst: { value: 2.0, probability: 30 },
            norm: { value: 3.0, probability: 50 },
            best: { value: 4.0, probability: 20 },
          },
          2026: {
            worst: { value: 2.2, probability: 30 },
            norm: { value: 3.2, probability: 50 },
            best: { value: 4.2, probability: 20 },
          },
          2027: {
            worst: { value: 2.4, probability: 30 },
            norm: { value: 3.4, probability: 50 },
            best: { value: 4.4, probability: 20 },
          },
          2028: {
            worst: { value: 2.6, probability: 30 },
            norm: { value: 3.6, probability: 50 },
            best: { value: 4.6, probability: 20 },
          },
        },
      },
      {
        id: '10',
        type: 'averageMonthlySalary',
        values: {
          2025: {
            worst: { value: 3.0, probability: 30 },
            norm: { value: 4.0, probability: 50 },
            best: { value: 5.0, probability: 20 },
          },
          2026: {
            worst: { value: 3.2, probability: 30 },
            norm: { value: 4.2, probability: 50 },
            best: { value: 5.2, probability: 20 },
          },
          2027: {
            worst: { value: 3.4, probability: 30 },
            norm: { value: 4.4, probability: 50 },
            best: { value: 5.4, probability: 20 },
          },
          2028: {
            worst: { value: 3.6, probability: 30 },
            norm: { value: 4.6, probability: 50 },
            best: { value: 5.6, probability: 20 },
          },
        },
      },
    ],
  },
]
