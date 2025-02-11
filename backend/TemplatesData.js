export let templates = [
  {
    id: '1',
    name: 'Макропоказатели за 25-28 год',
    indicators: [
      {
        id: '1',
        type: 'productProfitability',
        values: {
          2025: {
            worst: { value: 6.2, probability: 30 },
            norm: { value: 6.3, probability: 50 },
            best: { value: 6.4, probability: 20 },
          },
          2026: {
            worst: { value: 6.3, probability: 30 },
            norm: { value: 6.4, probability: 50 },
            best: { value: 6.5, probability: 20 },
          },
          2027: {
            worst: { value: 6.5, probability: 30 },
            norm: { value: 6.6, probability: 50 },
            best: { value: 6.7, probability: 20 },
          },
          2028: {
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
          2025: {
            worst: { value: 95, probability: 30 },
            norm: { value: 97, probability: 50 },
            best: { value: 99, probability: 20 },
          },
          2026: {
            worst: { value: 98, probability: 30 },
            norm: { value: 100, probability: 50 },
            best: { value: 102, probability: 20 },
          },
          2027: {
            worst: { value: 100, probability: 30 },
            norm: { value: 102, probability: 50 },
            best: { value: 104, probability: 20 },
          },
          2028: {
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
          2025: {
            worst: { value: 217600.0, probability: 30 },
            norm: { value: 217800.0, probability: 50 },
            best: { value: 218000.0, probability: 20 },
          },
          2026: {
            worst: { value: 218900.0, probability: 30 },
            norm: { value: 219000.0, probability: 50 },
            best: { value: 219200.0, probability: 20 },
          },
          2027: {
            worst: { value: 221880.0, probability: 30 },
            norm: { value: 221890.0, probability: 50 },
            best: { value: 221900, probability: 20 },
          },
          2028: {
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
          2025: {
            worst: { value: 100.5, probability: 30 },
            norm: { value: 105.1, probability: 50 },
            best: { value: 108, probability: 20 },
          },
          2026: {
            worst: { value: 99.8, probability: 30 },
            norm: { value: 104, probability: 50 },
            best: { value: 108.5, probability: 20 },
          },
          2027: {
            worst: { value: 99.9, probability: 30 },
            norm: { value: 104.5, probability: 50 },
            best: { value: 109.6, probability: 20 },
          },
          2028: {
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
          2025: {
            worst: { value: 1860, probability: 30 },
            norm: { value: 1991.20, probability: 50 },
            best: { value: 2390, probability: 20 },
          },
          2026: {
            worst: { value: 2100, probability: 30 },
            norm: { value: 2420, probability: 50 },
            best: { value: 2790, probability: 20 },
          },
          2027: {
            worst: { value: 2230, probability: 30 },
            norm: { value: 2590, probability: 50 },
            best: { value: 2840, probability: 20 },
          },
          2028: {
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
    name: 'Макро 25-28 от Виталия Рисковича',
    indicators: [
      {
        id: '6',
        type: 'productProfitability',
        values: {
          2025: {
            worst: { value: 6.2, probability: 30 },
            norm: { value: 6.3, probability: 50 },
            best: { value: 6.4, probability: 20 },
          },
          2026: {
            worst: { value: 6.3, probability: 30 },
            norm: { value: 6.4, probability: 50 },
            best: { value: 6.5, probability: 20 },
          },
          2027: {
            worst: { value: 6.5, probability: 30 },
            norm: { value: 6.6, probability: 50 },
            best: { value: 6.7, probability: 20 },
          },
          2028: {
            worst: { value: 6.6, probability: 30 },
            norm: { value: 6.7, probability: 50 },
            best: { value: 6.8, probability: 20 },
          },
        },
      },
      {
        id: '7',
        type: 'realWage',
        values: {
          2025: {
            worst: { value: 95, probability: 30 },
            norm: { value: 97, probability: 50 },
            best: { value: 99, probability: 20 },
          },
          2026: {
            worst: { value: 98, probability: 30 },
            norm: { value: 100, probability: 50 },
            best: { value: 102, probability: 20 },
          },
          2027: {
            worst: { value: 100, probability: 30 },
            norm: { value: 102, probability: 50 },
            best: { value: 104, probability: 20 },
          },
          2028: {
            worst: { value: 102, probability: 30 },
            norm: { value: 104, probability: 50 },
            best: { value: 106, probability: 20 },
          },
        },
      },
      {
        id: '8',
        type: 'gdp',
        values: {
          2025: {
            worst: { value: 217600.0, probability: 30 },
            norm: { value: 217800.0, probability: 50 },
            best: { value: 218000.0, probability: 20 },
          },
          2026: {
            worst: { value: 218900.0, probability: 30 },
            norm: { value: 219000.0, probability: 50 },
            best: { value: 219200.0, probability: 20 },
          },
          2027: {
            worst: { value: 221880.0, probability: 30 },
            norm: { value: 221890.0, probability: 50 },
            best: { value: 221900, probability: 20 },
          },
          2028: {
            worst: { value: 223981.0, probability: 30 },
            norm: { value: 223991.0, probability: 50 },
            best: { value: 224000.0, probability: 20 },
          },
        },
      },
      {
        id: '9',
        type: 'realDisposablePopulationIncome',
        values: {
          2025: {
            worst: { value: 101.5, probability: 30 },
            norm: { value: 106.1, probability: 50 },
            best: { value: 109, probability: 20 },
          },
          2026: {
            worst: { value: 100.8, probability: 30 },
            norm: { value: 105, probability: 50 },
            best: { value: 108.5, probability: 20 },
          },
          2027: {
            worst: { value: 100.9, probability: 30 },
            norm: { value: 105.5, probability: 50 },
            best: { value: 110.6, probability: 20 },
          },
          2028: {
            worst: { value: 101.3, probability: 30 },
            norm: { value: 106, probability: 50 },
            best: { value: 111.3, probability: 20 },
          },
        },
      },
      {
        id: '10',
        type: 'averageMonthlySalary',
        values: {
          2025: {
            worst: { value: 1880, probability: 30 },
            norm: { value: 2040.20, probability: 50 },
            best: { value: 2410, probability: 20 },
          },
          2026: {
            worst: { value: 2121, probability: 30 },
            norm: { value: 2444, probability: 50 },
            best: { value: 2815, probability: 20 },
          },
          2027: {
            worst: { value: 2255, probability: 30 },
            norm: { value: 2615, probability: 50 },
            best: { value: 2868, probability: 20 },
          },
          2028: {
            worst: { value: 2343, probability: 30 },
            norm: { value: 2646, probability: 50 },
            best: { value: 3010, probability: 20 },
          },
        },
      },
    ],
  },
  {id: '3',
    name: 'Макро на 25-28 (грустная)',
    indicators: [
  {
    id: '11',
    type: 'productProfitability',
    values: {
      2025: {
        worst: { value: 5.58, probability: 30 },
        norm: { value: 5.67, probability: 50 },
        best: { value: 5.76, probability: 20 },
      },
      2026: {
        worst: { value: 5.67, probability: 30 },
        norm: { value: 5.76, probability: 50 },
        best: { value: 5.85, probability: 20 },
      },
      2027: {
        worst: { value: 5.85, probability: 30 },
        norm: { value: 5.94, probability: 50 },
        best: { value: 6.03, probability: 20 },
      },
      2028: {
        worst: { value: 5.94, probability: 30 },
        norm: { value: 6.03, probability: 50 },
        best: { value: 6.12, probability: 20 },
      },
    },
  },
  {
    id: '12',
    type: 'realWage',
    values: {
      2025: {
        worst: { value: 85.5, probability: 30 },
        norm: { value: 87.3, probability: 50 },
        best: { value: 89.1, probability: 20 },
      },
      2026: {
        worst: { value: 88.2, probability: 30 },
        norm: { value: 90, probability: 50 },
        best: { value: 91.8, probability: 20 },
      },
      2027: {
        worst: { value: 90, probability: 30 },
        norm: { value: 91.8, probability: 50 },
        best: { value: 93.6, probability: 20 },
      },
      2028: {
        worst: { value: 91.8, probability: 30 },
        norm: { value: 93.6, probability: 50 },
        best: { value: 95.4, probability: 20 },
      },
    },
  },
  {
    id: '13',
    type: 'gdp',
    values: {
      2025: {
        worst: { value: 195840.0, probability: 30 },
        norm: { value: 196020.0, probability: 50 },
        best: { value: 196200.0, probability: 20 },
      },
      2026: {
        worst: { value: 197010.0, probability: 30 },
        norm: { value: 197100.0, probability: 50 },
        best: { value: 197280.0, probability: 20 },
      },
      2027: {
        worst: { value: 199692.0, probability: 30 },
        norm: { value: 199701.0, probability: 50 },
        best: { value: 199710, probability: 20 },
      },
      2028: {
        worst: { value: 201582.9, probability: 30 },
        norm: { value: 201591.9, probability: 50 },
        best: { value: 201600.0, probability: 20 },
      },
    },
  },
  {
    id: '14',
    type: 'realDisposablePopulationIncome',
    values: {
      2025: {
        worst: { value: 91.35, probability: 30 },
        norm: { value: 95.49, probability: 50 },
        best: { value: 98.1, probability: 20 },
      },
      2026: {
        worst: { value: 90.72, probability: 30 },
        norm: { value: 94.5, probability: 50 },
        best: { value: 97.65, probability: 20 },
      },
      2027: {
        worst: { value: 90.81, probability: 30 },
        norm: { value: 94.95, probability: 50 },
        best: { value: 99.54, probability: 20 },
      },
      2028: {
        worst: { value: 91.17, probability: 30 },
        norm: { value: 95.4, probability: 50 },
        best: { value: 100.17, probability: 20 },
      },
    },
  },
  {
    id: '15',
    type: 'averageMonthlySalary',
    values: {
      2025: {
        worst: { value: 1692, probability: 30 },
        norm: { value: 1836.18, probability: 50 },
        best: { value: 2169, probability: 20 },
      },
      2026: {
        worst: { value: 1908.9, probability: 30 },
        norm: { value: 2199.6, probability: 50 },
        best: { value: 2533.5, probability: 20 },
      },
      2027: {
        worst: { value: 2029.5, probability: 30 },
        norm: { value: 2353.5, probability: 50 },
        best: { value: 2581.2, probability: 20 },
      },
      2028: {
        worst: { value: 2108.7, probability: 30 },
        norm: { value: 2381.4, probability: 50 },
        best: { value: 2709, probability: 20 },
      },
    },
  },
],
}
  ]