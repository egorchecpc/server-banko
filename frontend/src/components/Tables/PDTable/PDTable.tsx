import React, { FC } from 'react'
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

interface ExtendedPDItem extends PDItem {
  year: string
  isYearly: boolean
}

interface PDTableProps {
  data: ExtendedPDItem[]
  deltaMode: boolean
  displayQuarterly: boolean
}

const PDTable: FC<PDTableProps> = ({ data, deltaMode, displayQuarterly }) => {
  const categoryToKey: Record<string, keyof PDItem> = {
    'Без просрочки': 'without',
    '0-30': 'between1To30',
    '30-60': 'between31To60',
    '60-90': 'between61To90',
    '90+': 'moreThen90',
  }

  const categories = Object.keys(categoryToKey)
  const years = [...new Set(data.map((item) => item.year))].sort()

  const getQuarterFromDate = (date: string): number => {
    const month = parseInt(date.split('-')[1])
    return Math.ceil(month / 3)
  }

  const renderTableHead = () => (
    <>
      <TableRow>
        <TableHead rowSpan={2} className="bg-muted border font-bold">
          Категория
        </TableHead>
        {years.map((year) => {
          const hasQuarterlyData = data.some(
            (item) => item.year === year && !item.isYearly
          )
          return (
            <TableHead
              key={year}
              colSpan={hasQuarterlyData ? 4 : 1}
              rowSpan={hasQuarterlyData ? 1 : 2}
              className="bg-muted border text-center font-bold"
            >
              {year}
            </TableHead>
          )
        })}
      </TableRow>
      {displayQuarterly && (
        <TableRow>
          {years.map((year) => {
            const hasQuarterlyData = data.some(
              (item) => item.year === year && !item.isYearly
            )
            return hasQuarterlyData ? (
              <React.Fragment key={year}>
                {['I', 'II', 'III', 'IV'].map((quarter) => (
                  <TableHead
                    key={`${year}-${quarter}`}
                    className="bg-muted border-x text-center font-medium"
                  >
                    {quarter}
                  </TableHead>
                ))}
              </React.Fragment>
            ) : null
          })}
        </TableRow>
      )}
    </>
  )

  const renderTableBody = () => {
    return categories.map((category) => (
      <TableRow key={category} className="border-none">
        <TableCell className="text-left font-medium">{category}</TableCell>
        {years.map((year) => {
          const yearData = data.filter((item) => item.year === year)
          const hasQuarterlyData = yearData.some((item) => !item.isYearly)

          if (hasQuarterlyData) {
            const quarters = yearData
              .filter((item) => !item.isYearly)
              .sort(
                (a, b) =>
                  getQuarterFromDate(a.date) - getQuarterFromDate(b.date)
              )

            return (
              <React.Fragment key={year}>
                {Array.from({ length: 4 }, (_, index) => {
                  const quarterData = quarters[index]
                  if (!quarterData) {
                    return (
                      <TableCell
                        key={`${year}-Q${index + 1}`}
                        className="border-l text-center"
                      >
                        -
                      </TableCell>
                    )
                  }

                  const dataIndex = data.findIndex(
                    (item) => item === quarterData
                  )
                  const previousData =
                    dataIndex > 0 ? data[dataIndex - 1] : undefined

                  const current = Number(quarterData[categoryToKey[category]])
                  const previous = previousData
                    ? Number(previousData[categoryToKey[category]])
                    : undefined

                  const deltaData =
                    deltaMode && previousData
                      ? calculateDelta(current, previous)
                      : { value: current, delta: null }

                  return (
                    <TableCell
                      key={`${year}-Q${index + 1}`}
                      className="border-l text-center"
                    >
                      {deltaData &&
                        renderCellWithDelta(deltaData.value, deltaData.delta)}
                    </TableCell>
                  )
                })}
              </React.Fragment>
            )
          } else {
            const yearlyData = yearData.find((item) => item.isYearly)
            if (!yearlyData) {
              return (
                <TableCell
                  key={`${year}-yearly`}
                  className="border-l text-center"
                >
                  -
                </TableCell>
              )
            }

            const dataIndex = data.findIndex((item) => item === yearlyData)
            const previousData = dataIndex > 0 ? data[dataIndex - 1] : undefined

            const current = Number(yearlyData[categoryToKey[category]])
            const previous = previousData
              ? Number(previousData[categoryToKey[category]])
              : undefined

            const deltaData =
              deltaMode && previousData
                ? calculateDelta(current, previous)
                : { value: current, delta: null }

            return (
              <TableCell
                key={`${year}-yearly`}
                className="border-l text-center"
              >
                {deltaData &&
                  renderCellWithDelta(deltaData.value, deltaData.delta)}
              </TableCell>
            )
          }
        })}
      </TableRow>
    ))
  }

  return (
    <Table className="table-auto border border-gray-200 bg-white">
      <TableHeader>{renderTableHead()}</TableHeader>
      <TableBody>{renderTableBody()}</TableBody>
    </Table>
  )
}

export default PDTable
