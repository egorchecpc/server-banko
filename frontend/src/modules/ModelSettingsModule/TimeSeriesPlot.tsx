import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const TimeSeriesPlot = () => {
  // Mock data based on the actual/fitted/residual chart
  const timeSeriesData = [
    { obs: 1, actual: -3.30234, fitted: -3.30724, residual: 0.00491 },
    { obs: 2, actual: -3.3095, fitted: -3.22955, residual: -0.07995 },
    { obs: 3, actual: -3.31822, fitted: -3.23442, residual: -0.0838 },
    { obs: 4, actual: -3.30375, fitted: -3.22267, residual: -0.08108 },
    { obs: 5, actual: -3.26895, fitted: -3.18599, residual: -0.08295 },
    { obs: 6, actual: -3.24311, fitted: -3.16092, residual: -0.08219 },
    { obs: 7, actual: -3.18063, fitted: -3.16184, residual: -0.01879 },
    { obs: 8, actual: -3.09934, fitted: -3.16961, residual: 0.07028 },
    { obs: 9, actual: -3.04454, fitted: -3.09872, residual: 0.05418 },
    { obs: 10, actual: -3.01088, fitted: -3.10137, residual: 0.0905 },
    { obs: 11, actual: -2.98948, fitted: -3.0423, residual: 0.05282 },
    { obs: 12, actual: -2.95732, fitted: -3.00633, residual: 0.04901 },
    { obs: 13, actual: -2.94003, fitted: -3.10107, residual: 0.16103 },
    { obs: 14, actual: -2.92605, fitted: -2.96491, residual: 0.03885 },
    { obs: 15, actual: -2.91195, fitted: -2.90984, residual: -0.00212 },
    { obs: 16, actual: -2.86707, fitted: -2.8703, residual: 0.00323 },
    { obs: 17, actual: -2.84215, fitted: -2.72991, residual: -0.11224 },
    { obs: 18, actual: -2.7856, fitted: -2.7002, residual: -0.0854 },
    { obs: 19, actual: -2.74514, fitted: -2.68848, residual: -0.05665 },
    { obs: 20, actual: -2.73803, fitted: -2.7148, residual: -0.02323 },
    { obs: 21, actual: -2.72595, fitted: -2.71847, residual: -0.00748 },
    { obs: 22, actual: -2.7197, fitted: -2.71706, residual: -0.00264 },
    { obs: 23, actual: -2.74148, fitted: -2.67067, residual: -0.0708 },
    { obs: 24, actual: -2.75118, fitted: -2.87651, residual: 0.12534 },
    { obs: 25, actual: -2.76651, fitted: -2.86245, residual: 0.09594 },
    { obs: 26, actual: -2.81209, fitted: -2.87444, residual: 0.06235 },
    { obs: 27, actual: -2.87995, fitted: -2.95085, residual: 0.0709 },
    { obs: 28, actual: -2.94536, fitted: -3.01116, residual: 0.0658 },
    { obs: 29, actual: -3.04805, fitted: -3.08474, residual: 0.03669 },
    { obs: 30, actual: -3.08396, fitted: -3.0861, residual: 0.00214 },
    { obs: 31, actual: -3.11372, fitted: -3.12238, residual: 0.00865 },
    { obs: 32, actual: -3.14662, fitted: -3.1385, residual: -0.00811 },
    { obs: 33, actual: -3.15741, fitted: -3.13118, residual: -0.02623 },
    { obs: 34, actual: -3.19433, fitted: -3.18376, residual: -0.01057 },
    { obs: 35, actual: -3.21032, fitted: -3.15082, residual: -0.0595 },
    { obs: 36, actual: -3.2345, fitted: -3.13562, residual: -0.09888 },
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border border-gray-400 bg-white p-2 text-xs">
          <p>{`Observation: ${payload[0].payload.obs}`}</p>
          {payload.map((entry, index) => (
            <p key={`value-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(5)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex w-full flex-col items-center p-4">
      <h3 className="mb-4 text-center text-lg font-semibold">
        Actual, Fitted, Residual Plot
      </h3>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={timeSeriesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="obs"
              label={{
                value: 'Observation',
                position: 'insideBottomRight',
                offset: -5,
              }}
            />
            <YAxis
              yAxisId="left"
              label={{ value: 'Values', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[-0.15, 0.2]}
              label={{ value: 'Residual', angle: 90, position: 'insideRight' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#ff7300"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="fitted"
              name="Fitted"
              stroke="#4caf50"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="residual"
              name="Residual"
              stroke="#2196f3"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-xs">
          <thead>
            <tr>
              <th className="border border-gray-400 px-2 py-1">Obs</th>
              <th className="border border-gray-400 px-2 py-1">Actual</th>
              <th className="border border-gray-400 px-2 py-1">Fitted</th>
              <th className="border border-gray-400 px-2 py-1">Residual</th>
            </tr>
          </thead>
          <tbody>
            {timeSeriesData.map((row) => (
              <tr key={row.obs}>
                <td className="border border-gray-400 px-2 py-1">{row.obs}</td>
                <td className="border border-gray-400 px-2 py-1">
                  {row.actual.toFixed(5)}
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  {row.fitted.toFixed(5)}
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  {row.residual.toFixed(5)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TimeSeriesPlot
