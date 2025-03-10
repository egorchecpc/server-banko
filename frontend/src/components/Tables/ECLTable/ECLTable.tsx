import React, { FC, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ECLData, StageData } from '@/models/ECL'
import { Button } from '@/components/ui/button'
import { ProductDiff } from '@/utils/calculateECLDif'

interface ECLTableProps {
  data: ECLData
  isFirst: boolean
  eclDiff: ECLData
  showDelta: boolean
}

interface StageKeys {
  stage1: string
  stage2: string
  stage3: string
}

const STAGES: { key: keyof StageKeys; label: string }[] = [
  { key: 'stage1', label: 'Стадия 1' },
  { key: 'stage2', label: 'Стадия 2' },
  { key: 'stage3', label: 'Стадия 3' },
]

const TOTAL_LABEL = 'Итого'
const HEADER_LABELS = ['ВБС', 'ОКУ', '%']

const renderCellWithDelta = (
  value: string,
  delta: string | undefined
): JSX.Element | string => {
  if (delta === undefined) return value
  const deltaNum = parseFloat(delta)
  if (isNaN(deltaNum)) return value

  const getArrowAndColor = (delta: number) => {
    if (delta === 0) return { color: 'text-yellow-500', arrow: '→' }
    return delta > 0
      ? { color: 'text-red-500', arrow: '↑' }
      : { color: 'text-green-500', arrow: '↓' }
  }

  const { color, arrow } = getArrowAndColor(deltaNum)
  return (
    <span>
      {value}
      <span className={`ml-1 ${color}`}>
        ({Math.abs(deltaNum).toFixed(2)}%{arrow})
      </span>
    </span>
  )
}

// Новая функция для отображения разницы в продуктах
const renderProductCellWithDelta = (
  value: number,
  delta: number | undefined,
  isPercent: boolean = false
): JSX.Element | string => {
  const formattedValue = isPercent
    ? formatPercent(value)
    : formatCurrency(value)

  if (delta === undefined) return formattedValue
  if (isNaN(delta)) return formattedValue

  const getArrowAndColor = (delta: number) => {
    if (delta === 0) return { color: 'text-yellow-500', arrow: '→' }
    return delta > 0
      ? { color: 'text-red-500', arrow: '↑' }
      : { color: 'text-green-500', arrow: '↓' }
  }

  const { color, arrow } = getArrowAndColor(delta)
  return (
    <span>
      {formattedValue}
      <span className={`ml-1 ${color}`}>
        ({Math.abs(delta).toFixed(2)}%{arrow})
      </span>
    </span>
  )
}

const renderStageCells = (
  stageData: StageData,
  diffData: StageData | undefined,
  showDelta: boolean
) => (
  <>
    <TableCell className="border-x text-center">{stageData.balance}</TableCell>
    <TableCell className="border-x text-center">
      {showDelta && diffData
        ? renderCellWithDelta(stageData.reserve, diffData.reserve)
        : stageData.reserve}
    </TableCell>
    <TableCell className="border-x text-center">
      {showDelta && diffData
        ? renderCellWithDelta(stageData.percent, diffData.percent)
        : stageData.percent}
    </TableCell>
  </>
)

const ECLTable: FC<ECLTableProps> = ({ data, isFirst, eclDiff, showDelta }) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <Table className="table-auto bg-white">
      <TableHeader>
        <TableRow className="border-b hover:bg-transparent">
          <TableHead
            rowSpan={2}
            className="bg-muted w-56 min-w-56 max-w-56 border text-left font-bold"
          >
            <div className="flex items-center justify-between">
              <span>{isFirst ? 'Виды кредитов' : 'Категория'}</span>
            </div>
          </TableHead>
          {STAGES.map((stage) => (
            <TableHead
              key={stage.key}
              colSpan={3}
              className="bg-muted w-1/4 border text-center font-bold"
            >
              {stage.label}
            </TableHead>
          ))}
          <TableHead
            colSpan={2}
            className="bg-muted w-1/5 border text-center font-bold"
          >
            {TOTAL_LABEL}
          </TableHead>
        </TableRow>
        <TableRow className="border-b hover:bg-transparent">
          {Array.from({ length: STAGES.length }, () => HEADER_LABELS)
            .flat()
            .map((label, i) => (
              <TableHead
                key={`${label}-${i}`}
                className="bg-muted border text-center font-bold"
              >
                {label}
              </TableHead>
            ))}
          <TableHead className="bg-muted border text-center font-bold">
            ВБС
          </TableHead>
          <TableHead className="bg-muted border text-center font-bold">
            ОКУ
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => {
          const diffRow = eclDiff?.[index]
          return (
            <React.Fragment key={index}>
              <TableRow
                className={`${row.creditType === TOTAL_LABEL ? 'border-t bg-grey-300 shadow' : 'border-0'} last:border-b`}
              >
                <TableCell
                  className="w-48 min-w-48 max-w-48 border-0 text-left font-medium"
                  onClick={() => toggleRow(index)}
                >
                  {isFirst && row.products && row.products.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(index)}
                      className="mr-2"
                    >
                      <span style={{ fontSize: '8px' }}>
                        {expandedRows[index] ? '▼' : '▶'}
                      </span>
                    </Button>
                  )}
                  {row.creditType}
                </TableCell>
                {STAGES.map((stage) => (
                  <React.Fragment key={stage.key}>
                    {renderStageCells(
                      row[stage.key],
                      diffRow?.[stage.key],
                      showDelta
                    )}
                  </React.Fragment>
                ))}
                <TableCell className="border-x text-center font-bold">
                  {row.total.balance}
                </TableCell>
                <TableCell className="border-x text-center font-bold">
                  {showDelta && diffRow
                    ? renderCellWithDelta(
                        row.total.reserve,
                        diffRow.total.reserve
                      )
                    : row.total.reserve}
                </TableCell>
              </TableRow>

              {isFirst &&
                row.products &&
                row.products.length > 0 &&
                expandedRows[index] &&
                row.products.map((product, productIndex) => {
                  // Получаем данные о разнице для продукта, если они доступны
                  const productDiff =
                    isFirst && showDelta && diffRow?.products
                      ? (diffRow.products[productIndex] as ProductDiff)
                      : undefined

                  return (
                    <TableRow
                      key={`product-${index}-${productIndex}`}
                      className="border-none bg-gray-50"
                    >
                      <TableCell className="border-none pl-8 text-left">
                        {product.product || 'Неизвестный продукт'}
                      </TableCell>

                      {/* Стадия 1 */}
                      <TableCell className="border-x text-center">
                        {formatCurrency(
                          product.stage1Data?.grossCarryingAmount || 0
                        )}
                      </TableCell>
                      <TableCell className="border-x text-center">
                        {showDelta && productDiff
                          ? renderProductCellWithDelta(
                              product.stage1Data?.estimatedReservation || 0,
                              productDiff.stage1Data?.estimatedReservation
                            )
                          : formatCurrency(
                              product.stage1Data?.estimatedReservation || 0
                            )}
                      </TableCell>
                      <TableCell className="border-x text-center">
                        {showDelta && productDiff
                          ? renderProductCellWithDelta(
                              product.stage1Data?.reservationPercentage || 0,
                              productDiff.stage1Data?.reservationPercentage,
                              true
                            )
                          : formatPercent(
                              product.stage1Data?.reservationPercentage || 0
                            )}
                      </TableCell>

                      {/* Стадия 2 */}
                      <TableCell className="border-x text-center">
                        {formatCurrency(
                          product.stage2Data?.grossCarryingAmount || 0
                        )}
                      </TableCell>
                      <TableCell className="border-x text-center">
                        {showDelta && productDiff
                          ? renderProductCellWithDelta(
                              product.stage2Data?.estimatedReservation || 0,
                              productDiff.stage2Data?.estimatedReservation
                            )
                          : formatCurrency(
                              product.stage2Data?.estimatedReservation || 0
                            )}
                      </TableCell>
                      <TableCell className="border-x text-center">
                        {showDelta && productDiff
                          ? renderProductCellWithDelta(
                              product.stage2Data?.reservationPercentage || 0,
                              productDiff.stage2Data?.reservationPercentage,
                              true
                            )
                          : formatPercent(
                              product.stage2Data?.reservationPercentage || 0
                            )}
                      </TableCell>

                      {/* Стадия 3 */}
                      <TableCell className="border-x text-center">
                        {formatCurrency(
                          product.stage3Data?.grossCarryingAmount || 0
                        )}
                      </TableCell>
                      <TableCell className="border-x text-center">
                        {showDelta && productDiff
                          ? renderProductCellWithDelta(
                              product.stage3Data?.estimatedReservation || 0,
                              productDiff.stage3Data?.estimatedReservation
                            )
                          : formatCurrency(
                              product.stage3Data?.estimatedReservation || 0
                            )}
                      </TableCell>
                      <TableCell className="border-x text-center">
                        {showDelta && productDiff
                          ? renderProductCellWithDelta(
                              product.stage3Data?.reservationPercentage || 0,
                              productDiff.stage3Data?.reservationPercentage,
                              true
                            )
                          : formatPercent(
                              product.stage3Data?.reservationPercentage || 0
                            )}
                      </TableCell>

                      {/* Итого */}
                      <TableCell className="border-x text-center">
                        {formatCurrency(product.grossCarryingAmount || 0)}
                      </TableCell>
                      <TableCell className="border-x text-center">
                        {showDelta && productDiff
                          ? renderProductCellWithDelta(
                              product.estimatedReservation || 0,
                              productDiff.estimatedReservation
                            )
                          : formatCurrency(product.estimatedReservation || 0)}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </React.Fragment>
          )
        })}
      </TableBody>
    </Table>
  )
}

// Utility functions (since they're not imported)
const formatCurrency = (value: number): string => {
  return value.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`
}

export default ECLTable
