import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
} from 'recharts'

const AutocorrelationChart = () => {
  // Mock data based on the correlogram image
  const autocorrelationData = [
    { lag: 1, ac: 0.608, pac: 0.608 },
    { lag: 2, ac: 0.392, pac: 0.035 },
    { lag: 3, ac: 0.254, pac: 0.005 },
    { lag: 4, ac: -0.054, pac: -0.347 },
    { lag: 5, ac: -0.222, pac: -0.129 },
    { lag: 6, ac: -0.385, pac: -0.239 },
    { lag: 7, ac: -0.565, pac: -0.278 },
    { lag: 8, ac: -0.531, pac: -0.08 },
    { lag: 9, ac: -0.475, pac: -0.108 },
    { lag: 10, ac: -0.385, pac: -0.079 },
    { lag: 11, ac: -0.106, pac: 0.138 },
    { lag: 12, ac: 0.124, pac: 0.136 },
    { lag: 13, ac: 0.277, pac: 0.054 },
    { lag: 14, ac: 0.329, pac: -0.196 },
    { lag: 15, ac: 0.354, pac: -0.073 },
    { lag: 16, ac: 0.346, pac: -0.055 },
  ]

  // Calculate confidence intervals (±2/√n)
  const n = 36 // Number of observations
  const confidenceInterval = 2 / Math.sqrt(n)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border border-gray-400 bg-white p-2 text-xs">
          <p>{`Lag: ${payload[0].payload.lag}`}</p>
          <p>{`AC: ${payload[0].payload.ac.toFixed(3)}`}</p>
          <p>{`PAC: ${payload[0].payload.pac.toFixed(3)}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <h3 className="mb-4 text-center text-lg font-semibold">
        Correlogram of Residuals
      </h3>
      <div className="mb-4 w-full text-xs">
        <div>Date: 03/05/25 Time: 15:37</div>
        <div>Sample (adjusted): 1 36</div>
        <div>Included observations: 36 after adjustments</div>
      </div>

      <div className="flex w-full flex-col lg:flex-row">
        {/* Autocorrelation Chart */}
        <div className="mb-4 w-full lg:mb-0 lg:w-1/2">
          <h4 className="mb-2 text-center text-sm font-medium">
            Autocorrelation
          </h4>
          <BarChart
            width={300}
            height={300}
            data={autocorrelationData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lag" />
            <YAxis domain={[-1, 1]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#000" />
            <ReferenceLine
              y={confidenceInterval}
              stroke="#ff0000"
              strokeDasharray="3 3"
            />
            <ReferenceLine
              y={-confidenceInterval}
              stroke="#ff0000"
              strokeDasharray="3 3"
            />
            <Bar dataKey="ac" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Partial Autocorrelation Chart */}
        <div className="w-full lg:w-1/2">
          <h4 className="mb-2 text-center text-sm font-medium">
            Partial Autocorrelation
          </h4>
          <BarChart
            width={300}
            height={300}
            data={autocorrelationData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lag" />
            <YAxis domain={[-1, 1]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#000" />
            <ReferenceLine
              y={confidenceInterval}
              stroke="#ff0000"
              strokeDasharray="3 3"
            />
            <ReferenceLine
              y={-confidenceInterval}
              stroke="#ff0000"
              strokeDasharray="3 3"
            />
            <Bar dataKey="pac" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-xs">
          <thead>
            <tr>
              <th className="border border-gray-400 px-2 py-1">Lag</th>
              <th className="border border-gray-400 px-2 py-1">
                Autocorrelation
              </th>
              <th className="border border-gray-400 px-2 py-1">
                Partial Correlation
              </th>
              <th className="border border-gray-400 px-2 py-1">AC</th>
              <th className="border border-gray-400 px-2 py-1">PAC</th>
              <th className="border border-gray-400 px-2 py-1">Q-Stat</th>
              <th className="border border-gray-400 px-2 py-1">Prob</th>
            </tr>
          </thead>
          <tbody>
            {autocorrelationData.map((row) => (
              <tr key={row.lag}>
                <td className="border border-gray-400 px-2 py-1">{row.lag}</td>
                <td className="border border-gray-400 px-2 py-1">
                  <div className="flex h-6 items-center justify-center">
                    <div
                      className={`h-4 bg-blue-500`}
                      style={{
                        width: `${Math.abs(row.ac) * 50}px`,
                        marginLeft: row.ac < 0 ? 'auto' : '0',
                        marginRight: row.ac > 0 ? 'auto' : '0',
                      }}
                    ></div>
                  </div>
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  <div className="flex h-6 items-center justify-center">
                    <div
                      className={`h-4 bg-green-500`}
                      style={{
                        width: `${Math.abs(row.pac) * 50}px`,
                        marginLeft: row.pac < 0 ? 'auto' : '0',
                        marginRight: row.pac > 0 ? 'auto' : '0',
                      }}
                    ></div>
                  </div>
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  {row.ac.toFixed(3)}
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  {row.pac.toFixed(3)}
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  {(14.445 + row.lag * 5.5).toFixed(3)}
                </td>
                <td className="border border-gray-400 px-2 py-1">0.000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AutocorrelationChart
