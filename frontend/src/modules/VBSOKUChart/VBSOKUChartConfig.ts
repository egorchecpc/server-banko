export const VBSOKUChartConfig = {
  margins: { top: 20, right: 30, left: 20, bottom: 20 },
  height: 50,
  barSize: 30,
  yAxisRightDomain: [0, 15],

  series: {
    vbs: {
      label: 'ВБС (по выбранной метрике)',
      color: 'var(--chart80)',
      valueFormatter: (value: number) =>
        value.toLocaleString('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    },
    okuPercentage: {
      label: 'ОКУ (по выбранной метрике)',
      color: 'var(--chart40)',
      valueFormatter: (value: number) => `${value.toFixed(2)}%`,
    },
  },

  axes: {
    yLeft: {
      tickFormatter: (value: number) => (value / 1000000).toFixed(2),
      label: {
        value: 'млн',
        position: 'insideLeft' as const,
        angle: -90,
        offset: 0,
      },
    },
    yRight: {
      tickFormatter: (value: number) => `${value.toFixed(2)}%`,
    },
  },
}
