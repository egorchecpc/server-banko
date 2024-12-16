import { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ECLData } from '@/models/ECL'

interface ECLTableProps {
  data: ECLData
}

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
          <TableHead
            colSpan={3}
            className="bg-muted w-1/4 border text-center font-bold"
          >
            Стадия 1
          </TableHead>
          <TableHead
            colSpan={3}
            className="bg-muted w-1/4 border text-center font-bold"
          >
            Стадия 2
          </TableHead>
          <TableHead
            colSpan={3}
            className="bg-muted w-1/4 border text-center font-bold"
          >
            Стадия 3
          </TableHead>
          <TableHead
            colSpan={2}
            className="bg-muted w-1/5 border text-center font-bold"
          >
            Итого
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="bg-muted border text-center font-bold">
            ВБС
          </TableHead>
          <TableHead className="bg-muted border text-center font-bold">
            ОКУ
          </TableHead>
          <TableHead className="bg-muted border text-center font-bold">
            %
          </TableHead>
          <TableHead className="bg-muted border text-center font-bold">
            ВБС
          </TableHead>
          <TableHead className="bg-muted border text-center font-bold">
            ОКУ
          </TableHead>
          <TableHead className="bg-muted border text-center font-bold">
            %
          </TableHead>
          <TableHead className="bg-muted border text-center font-bold">
            ВБС
          </TableHead>
          <TableHead className="bg-muted border text-center font-bold">
            ОКУ
          </TableHead>
          <TableHead className="bg-muted border text-center font-bold">
            %
          </TableHead>
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
            className={`${row.creditType == 'Итого' ? 'bg-grey-300 shadow' : ''}`}
          >
            <TableCell
              className={`border text-left ${row.creditType == 'Итого' ? 'font-bold' : 'font-medium'}`}
            >
              {row.creditType}
            </TableCell>
            <TableCell className="border text-center">
              {row.stage1.balance}
            </TableCell>
            <TableCell className="border text-center">
              {row.stage1.reserve}
            </TableCell>
            <TableCell className="border text-center">
              {row.stage1.percent}
            </TableCell>
            <TableCell className="border text-center">
              {row.stage2.balance}
            </TableCell>
            <TableCell className="border text-center">
              {row.stage2.reserve}
            </TableCell>
            <TableCell className="border text-center">
              {row.stage2.percent}
            </TableCell>
            {/* Стадия 3 */}
            <TableCell className="border text-center">
              {row.stage3.balance}
            </TableCell>
            <TableCell className="border text-center">
              {row.stage3.reserve}
            </TableCell>
            <TableCell className="border text-center">
              {row.stage3.percent}
            </TableCell>
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
