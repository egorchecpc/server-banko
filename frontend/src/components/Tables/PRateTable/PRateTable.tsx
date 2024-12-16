import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const PRateTable = () => {
  return (
    <Table className="table-auto bg-white">
      <TableHeader>
        <TableRow className="border-y-0">
          <TableHead className="w-1/3 border-x"></TableHead>
          <TableHead className="w-2/3">1 января 2024</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-y-0">
          <TableCell className="border-x font-medium">PR</TableCell>
          <TableCell>3%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default PRateTable
