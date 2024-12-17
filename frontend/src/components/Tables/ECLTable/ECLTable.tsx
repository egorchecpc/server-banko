import { FC } from 'react'
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
    <TableCell className="border text-center">{stageData.balance}</TableCell>
    <TableCell className="border text-center">{stageData.reserve}</TableCell>
    <TableCell className="border text-center">{stageData.percent}</TableCell>
  </>
)

const ECLTable: FC<ECLTableProps> = ({ data }) => {
  return (
    <Table className="table-auto bg-white">
      <TableHeader>
        <TableRow>
          <TableHead
            rowSpan={2}
            className="bg-muted w-1/12 border text-left font-bold"
          >
            Виды кредитов
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
        <TableRow>
          {Array.from({ length: STAGES.length }, () => HEADER_LABELS)
            .flat()
            .map((label, i) => (
              <TableHead
                key={i}
                className="bg-muted border text-center font-bold"
              >
                {label}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={index}
            className={
              row.creditType === TOTAL_LABEL ? 'bg-grey-300 shadow' : ''
            }
          >
            <TableCell
              className={`border text-left ${
                row.creditType === TOTAL_LABEL ? 'font-bold' : 'font-medium'
              }`}
            >
              {row.creditType}
            </TableCell>
            {STAGES.map((stage) => renderStageCells(row[stage.key]))}
            <TableCell className="text-bold border">
              {row.total.balance}
            </TableCell>
            <TableCell className="border text-center">
              {row.total.reserve}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ECLTable
