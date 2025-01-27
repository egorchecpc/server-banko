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
}

const RiskGroupTable: FC<RiskGroupTableProps> = ({
  data,
  title = 'Группа риска / Стадии обесценения',
}) => {
  return (
    <ContainerComponent withBg={true} title={title}>
      <ContainerBody isScrolling={true} orientation={'horizontal'}>
        <Table className="table-auto border border-gray-200 bg-white">
          <TableHeader>
            <TableRow>
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
              <TableRow key={rowIndex} className="border-y-0">
                <TableCell className="w-auto whitespace-nowrap border-x text-left font-medium">
                  {row.category}
                </TableCell>
                {row.stages.map((value, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="w-36 border-x text-right"
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ContainerBody>
    </ContainerComponent>
  )
}

export default RiskGroupTable
