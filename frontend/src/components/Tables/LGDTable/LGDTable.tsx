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
import { LGDItem } from '@/models/LGD'

interface LGDTableProps {
  data: LGDItem[]
}

const LGDTable: FC<LGDTableProps> = ({ data }) => {
  return (
    <ContainerComponent withBg={true}>
      <div className="mb-2 flex items-center justify-between">
        <div className="my-2 ml-4 flex items-center">
          <div className="text-xl font-bold leading-24 text-black-800">
            Убыток в случае дефолта (LGD)
          </div>
        </div>
      </div>

      <ContainerBody isScrolling={true} orientation="horizontal">
        <Table className="table-auto border border-gray-200 bg-white">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="bg-muted w-auto whitespace-nowrap border text-left">
                Нахождение в дефолте
              </TableHead>
              <TableHead className="bg-muted w-64 border text-center">
                1 кв 2023
              </TableHead>
              <TableHead className="bg-muted w-64 border text-center">
                2 кв 2023
              </TableHead>
              <TableHead className="bg-muted w-64 border text-center">
                3 кв 2023
              </TableHead>
              <TableHead className="bg-muted w-64 border text-center">
                4 кв 2023
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-y-0">
                <TableCell className="w-auto whitespace-nowrap border-x text-left font-medium">
                  {row.category}
                </TableCell>
                {row.quarters.map((value, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="w-64 border-x text-center"
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

export default LGDTable
