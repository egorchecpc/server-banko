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
import { KPIItem } from '@/models/KPI'

interface KPITableProps {
  data: KPIItem[]
}

const KPITable: FC<KPITableProps> = ({ data }) => {
  return (
    <ContainerComponent withBg={true} title="Информация в отношении KPI">
      <ContainerBody isScrolling={true} orientation={'horizontal'}>
        <Table className="table-auto border border-gray-200 bg-white">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="bg-muted w-auto whitespace-nowrap border text-left">
                Установленный KPI
              </TableHead>
              <TableHead className="bg-muted w-64 border text-center">
                Показатель по состоянию на 31.12.2023
              </TableHead>
              <TableHead className="bg-muted w-64 border text-center">
                Вывод о выполнении
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-y-0">
                <TableCell className="w-auto whitespace-nowrap border-x text-left font-medium">
                  {row.kpiName}
                </TableCell>
                <TableCell className="w-64 border-x text-center">
                  {row.currentValue}
                </TableCell>
                <TableCell
                  className={`w-64 border-x text-center ${row.conclusion == 'Выполняется' ? 'bg-lite-green' : 'bg-lite-orange/5'}`}
                >
                  {row.conclusion}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ContainerBody>
    </ContainerComponent>
  )
}

export default KPITable
