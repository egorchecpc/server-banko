import React, { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ECLData, StageData } from '@/models/ECL'

interface ECLTableProps {
  data: ECLData
  isFirst: boolean
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

const renderStageCells = (stageData: StageData) => (
  <>
    <TableCell className="border-x text-center">{stageData.balance}</TableCell>
    <TableCell className="border-x text-center">{stageData.reserve}</TableCell>
    <TableCell className="border-x text-center">{stageData.percent}</TableCell>
  </>
)

const ECLTable: FC<ECLTableProps> = ({ data, isFirst }) => {
  return (
    <Table className="table-auto bg-white">
      <TableHeader>
        <TableRow className="border-b hover:bg-transparent">
          <TableHead
            rowSpan={2}
            className="bg-muted w-52 min-w-52 max-w-52 border text-left font-bold"
          >
            {isFirst ? 'Виды кредитов' : 'Категория'}
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
        {data.map((row, index) => (
          <TableRow
            key={index}
            className={`${row.creditType === TOTAL_LABEL ? 'border-t bg-grey-300 shadow' : 'border-0'} last:border-b`}
          >
            <TableCell
              className={`w-48 min-w-48 max-w-48 border-0 text-left ${
                row.creditType === TOTAL_LABEL ? 'font-bold' : 'font-medium'
              }`}
            >
              {row.creditType}
            </TableCell>
            {STAGES.map((stage) => (
              <React.Fragment key={stage.key}>
                {renderStageCells(row[stage.key])}
              </React.Fragment>
            ))}
            <TableCell className="border-x text-center font-bold">
              {row.total.balance}
            </TableCell>
            <TableCell className="border-x text-center font-bold">
              {row.total.reserve}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ECLTable
