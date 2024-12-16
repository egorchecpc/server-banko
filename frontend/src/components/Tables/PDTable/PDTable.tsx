import { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PDItem } from '@/models/PD'

interface PDYearTableProps {
  data: PDItem[]
  deltaMode: boolean
  displayQuarterly: boolean
}

const PDTable: FC<PDYearTableProps> = ({
  data,
  deltaMode,
  displayQuarterly,
}) => {
  const categoryToKey: Record<string, keyof PDItem> = {
    'Не просроченные': 'without',
    '0-30': 'between1To30',
    '30-60': 'between31To60',
    '60-90': 'between61To90',
    '90+': 'moreThen90Percent',
  }

  const categories = Object.keys(categoryToKey)
  const years = [...new Set(data.map((item) => item.date.slice(0, 4)))]

  const calculateDelta = (
    current: number | undefined,
    previous: number | undefined
  ) => {
    if (current === undefined || previous === undefined) return null
    const delta = current - previous
    return { value: current, delta, isIncrease: delta > 0 }
  }

  const renderCellWithDelta = (value: number, delta: number | null) => {
    if (delta === null) return `${value.toFixed(2)}%`
    return (
      <span>
        {`${value.toFixed(2)}%`}
        <span
          className={`ml-1 ${delta > 0 ? 'text-red-500' : 'text-green-500'}`}
        >
          ({`${Math.abs(delta).toFixed(2)}%`}
          {delta > 0 ? '↑' : '↓'})
        </span>
      </span>
    )
  }

  return (
    <Table className="table-auto border border-gray-200 bg-white">
      <TableHeader>
        <TableRow>
          <TableHead rowSpan={2} className="bg-muted border font-bold">
            Категория
          </TableHead>
          {years.map((year) => (
            <TableHead
              colSpan={displayQuarterly ? 4 : 1}
              key={year}
              className="bg-muted border text-center font-bold"
            >
              {year}
            </TableHead>
          ))}
        </TableRow>
        {displayQuarterly && (
          <TableRow>
            {years.map(() =>
              ['I', 'II', 'III', 'IV'].map((quarter) => (
                <TableHead
                  key={quarter}
                  className="bg-muted border-x text-center font-medium"
                >
                  {quarter}
                </TableHead>
              ))
            )}
          </TableRow>
        )}
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category} className="border-none">
            <TableCell className="text-left font-medium">{category}</TableCell>
            {years.map((year, yearIndex) =>
              (displayQuarterly ? ['Q1', 'Q2', 'Q3', 'Q4'] : [year]).map(
                (period, periodIndex) => {
                  const currentData = data.find(
                    (item) =>
                      item.date ===
                      (displayQuarterly ? `${year}-${period}` : year)
                  )
                  const current = currentData
                    ? Number(currentData[categoryToKey[category]])
                    : undefined

                  const previousData =
                    periodIndex === 0 && yearIndex > 0
                      ? data.find((item) =>
                          displayQuarterly
                            ? item.date === `${years[yearIndex - 1]}-Q4`
                            : item.date === years[yearIndex - 1]
                        )
                      : periodIndex > 0
                        ? data.find(
                            (item) => item.date === `${year}-Q${periodIndex}`
                          )
                        : undefined

                  const previous = previousData
                    ? Number(previousData[categoryToKey[category]])
                    : undefined

                  const deltaData =
                    deltaMode && (yearIndex > 0 || periodIndex > 0)
                      ? calculateDelta(current, previous)
                      : { value: current ?? 0, delta: null }

                  return (
                    <TableCell
                      key={`${category}-${year}-${period}`}
                      className="border-l text-center"
                    >
                      {deltaData &&
                        renderCellWithDelta(deltaData.value, deltaData.delta)}
                    </TableCell>
                  )
                }
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PDTable
