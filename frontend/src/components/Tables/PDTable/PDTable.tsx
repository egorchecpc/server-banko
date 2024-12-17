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
import { calculateDelta, renderCellWithDelta } from '@/utils/calculateDelta'

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

  const getPreviousData = (
    year: string,
    period: string | null,
    yearIndex: number,
    periodIndex: number
  ) => {
    if (!displayQuarterly) {
      return yearIndex > 0
        ? data.find((item) => item.date === years[yearIndex - 1])
        : undefined
    }
    if (periodIndex === 0 && yearIndex > 0) {
      return data.find((item) => item.date === `${years[yearIndex - 1]}-Q4`)
    }
    return periodIndex > 0
      ? data.find((item) => item.date === `${year}-Q${periodIndex}`)
      : undefined
  }

  const renderTableHead = () => (
    <>
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
    </>
  )

  const renderTableBody = () =>
    categories.map((category) => (
      <TableRow key={category} className="border-none">
        <TableCell className="text-left font-medium">{category}</TableCell>
        {years.map((year, yearIndex) =>
          (displayQuarterly ? ['Q1', 'Q2', 'Q3', 'Q4'] : [null]).map(
            (period, periodIndex) => {
              const currentData = data.find((item) =>
                displayQuarterly
                  ? item.date === `${year}-${period}`
                  : item.date === year
              )

              const current = currentData
                ? Number(currentData[categoryToKey[category]])
                : undefined

              const previousData = getPreviousData(
                year,
                period,
                yearIndex,
                periodIndex
              )

              const previous = previousData
                ? Number(previousData[categoryToKey[category]])
                : undefined

              const deltaData =
                deltaMode && (yearIndex > 0 || periodIndex > 0)
                  ? calculateDelta(current, previous)
                  : { value: current ?? 0, delta: null }

              return (
                <TableCell
                  key={`${category}-${year}-${period || 'Year'}`}
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
    ))

  return (
    <Table className="table-auto border border-gray-200 bg-white">
      <TableHeader>{renderTableHead()}</TableHeader>
      <TableBody>{renderTableBody()}</TableBody>
    </Table>
  )
}

export default PDTable
