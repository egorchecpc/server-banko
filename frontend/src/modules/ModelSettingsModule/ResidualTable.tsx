import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts'

const residualData = [
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
        <p>{`Остаток: ${payload[0].value.toFixed(5)}`}</p>
      </div>
    )
  }
  return null
}

const ResidualPlot = () => {
  return (
    <div className="flex w-full flex-row items-start justify-center bg-white p-4">
      <table className="border-collapse border border-gray-400 text-xs">
        <thead>
          <tr>
            <th className="border border-gray-400 px-2 py-1">Obs</th>
            <th className="border border-gray-400 px-2 py-1">Actual</th>
            <th className="border border-gray-400 px-2 py-1">Fitted</th>
            <th className="border border-gray-400 px-2 py-1">Residual</th>
          </tr>
        </thead>
        <tbody>
          {residualData.map((row) => (
            <tr key={row.obs} className="h-6">
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
      <LineChart
        width={300}
        height={36 * 26}
        data={residualData}
        layout="vertical"
        margin={{ top: 40, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis
          dataKey="obs"
          type="category"
          interval={0}
          width={30}
          tick={{ fontSize: 10 }}
        />
        <XAxis type="number" />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine x={0} stroke="black" />
        <Line
          type="monotone"
          dataKey="residual"
          stroke="#8884d8"
          dot={{ r: 4 }}
        />
      </LineChart>
    </div>
  )
}

export default ResidualPlot
