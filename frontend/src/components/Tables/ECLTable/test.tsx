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

interface ECLTableProps {
  data: ECLData
  isFirst: boolean
  eclDiff: ECLData
  showDelta: boolean
}

const STAGES = [
  { key: 'stage1', label: 'Стадия 1' },
  { key: 'stage2', label: 'Стадия 2' },
  { key: 'stage3', label: 'Стадия 3' },
]

const renderStageCells = (stageData: StageData, showDelta: boolean) => (
  <>
    <TableCell className="border-x text-center">{stageData.balance}</TableCell>
    <TableCell className="border-x text-center">{stageData.reserve}</TableCell>
    <TableCell className="border-x text-center">{stageData.percent}</TableCell>
  </>
)

const ECLTable: FC<ECLTableProps> = ({ data, isFirst, showDelta }) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <Table className="table-auto bg-white">
      <TableHeader>
        <TableRow className="border-b hover:bg-transparent">
          <TableHead className="bg-muted w-52 border text-left font-bold">
            Категория
          </TableHead>
          {STAGES.map((stage) => (
            <TableHead
              key={stage.key}
              colSpan={3}
              className="bg-muted border text-center font-bold"
            >
              {stage.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <React.Fragment key={index}>
            <TableRow className="border-b hover:bg-gray-100">
              <TableCell className="border-x text-left font-medium">
                {isFirst && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRow(index)}
                  >
                    {expandedRows[index] ? '▼' : '▶'}
                  </Button>
                )}
                {row.creditType}
              </TableCell>
              {STAGES.map((stage) =>
                renderStageCells(row[stage.key], showDelta)
              )}
            </TableRow>
            {isFirst && expandedRows[index] && (
              <>
                {[1, 2, 3].map((i) => (
                  <TableRow
                    key={`product-${index}-${i}`}
                    className="border-b bg-gray-50"
                  >
                    <TableCell className="border-x pl-8 text-left">
                      Продукт {i}
                    </TableCell>
                    {STAGES.map(() => (
                      <>
                        <TableCell className="border-x text-center">
                          0
                        </TableCell>
                        <TableCell className="border-x text-center">
                          0
                        </TableCell>
                        <TableCell className="border-x text-center">
                          0
                        </TableCell>
                      </>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  )
}

export default ECLTable
