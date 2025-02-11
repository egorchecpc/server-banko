import { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ContainerBody,
  ContainerComponent,
} from '@/components/ContainerComponent/ContainerComponent'
import { RiskGroupItem } from '@/models/RiskGoupItem'

interface RiskGroupTableProps {
  data: RiskGroupItem[]
  title?: string
  isPercent?: boolean
}

const RiskGroupTable: FC<RiskGroupTableProps> = ({
  data,
  title = 'Группа риска / Стадии обесценения',
  isPercent = false,
}) => {
  return (
    <ContainerComponent withBg={true} title={title}>
      <ContainerBody isScrolling={true} orientation={'horizontal'}>
        <Table className="table-auto border border-gray-200 bg-white">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="bg-muted w-auto whitespace-nowrap border text-left">
                Группа риска / Стадии обесценения
              </TableHead>
              <TableHead className="bg-muted w-36 border text-center">
                1
              </TableHead>
              <TableHead className="bg-muted w-36 border text-center">
                2
              </TableHead>
              <TableHead className="bg-muted w-36 border text-center">
                3
              </TableHead>
              <TableHead className="bg-muted w-36 border text-center">
                POCI
              </TableHead>
              <TableHead className="bg-muted w-36 border text-center">
                Итого
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={`group border-y-0 last:border-b ${row.risk === 'Итого' ? 'border-t bg-grey-300 shadow hover:bg-grey-300/40' : 'border-0'} `}
              >
                <TableCell
                  className={`w-auto whitespace-nowrap border-x text-left group-hover:bg-grey-300/40 ${row.risk === 'Итого' ? 'font-bold hover:bg-grey-300/40' : 'font-medium'}`}
                >
                  {row.risk}
                </TableCell>
                <TableCell
                  className={`w-36 border-x text-right group-hover:bg-grey-300/40 ${row.risk === 'Итого' ? 'font-bold' : 'font-medium'}`}
                >
                  {isPercent ? `${row.stage1}%` : row.stage1}
                </TableCell>
                <TableCell
                  className={`w-36 border-x text-right group-hover:bg-grey-300/40 ${row.risk === 'Итого' ? 'font-bold' : 'font-medium'}`}
                >
                  {isPercent ? `${row.stage2}%` : row.stage2}
                </TableCell>
                <TableCell
                  className={`w-36 border-x text-right group-hover:bg-grey-300/40 ${row.risk === 'Итого' ? 'font-bold' : 'font-medium'}`}
                >
                  {isPercent ? `${row.stage3}%` : row.stage3}
                </TableCell>
                <TableCell
                  className={`w-36 border-x text-right group-hover:bg-grey-300/40 ${row.risk === 'Итого' ? 'font-bold' : 'font-medium'}`}
                >
                  {isPercent ? `${row.poci}%` : row.poci}
                </TableCell>
                <TableCell
                  className={`w-36 border-x text-right group-hover:bg-grey-300/40 ${row.risk === 'Итого' ? 'bg-grey-300 font-bold' : 'font-medium'}`}
                >
                  {isPercent ? `${row.total}%` : row.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ContainerBody>
    </ContainerComponent>
  )
}

export default RiskGroupTable
