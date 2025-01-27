import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const PCureTable = () => {
  return (
    <Table className="table-auto bg-white">
      <TableHeader>
        <TableRow className="border-y-0">
          <TableHead className="w-1/3 border-x"></TableHead>
          <TableHead className="w-2/3 border-x">1 января 2024</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-y-0">
          <TableCell className="border-x font-medium">P_qure</TableCell>
          <TableCell className="border-x">17%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default PCureTable
