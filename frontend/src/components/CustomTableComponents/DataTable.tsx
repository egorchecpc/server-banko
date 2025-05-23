import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DataTablePagination } from '@/components/CustomTableComponents/DataTablePagination'
import { DataTableToolbar } from '@/components/CustomTableComponents/DataTableToolbar'
import { ContainerComponent } from '@/components/ContainerComponent/ContainerComponent'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  titles: Record<string, string>
  filters: Array<{
    title: string
    column: string
    options: Array<{ label: string; value: string }>
  }>
  searchPlaceholder?: string
  searchColumn: string
  withContainer?: boolean
  withCustomStyle?: boolean
  onRowDoubleClick?: (id: string) => void
  onRowClick?: (id: string) => void
  initialSelectedId?: string
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  titles,
  filters,
  searchPlaceholder = 'Поиск...',
  searchColumn,
  withContainer = false,
  withCustomStyle = false,
  onRowDoubleClick,
  onRowClick,
  initialSelectedId,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(
    initialSelectedId || null
  )
  const { t } = useTranslation()

  React.useEffect(() => {
    if (initialSelectedId) {
      setSelectedRowId(initialSelectedId)
    } else if (data.length > 0) {
      setSelectedRowId(data[0].id)
    }
  }, [])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const handleRowClick = (id: string) => {
    setSelectedRowId(id)
    onRowClick?.(id)
  }

  const TableContent = (
    <div
      className={`w-full max-w-full overflow-auto rounded-lg border-grey-900/30 shadow-lg ${withCustomStyle ? 'flex overflow-hidden rounded-xl border border-[#d0dbe7] bg-slate-50' : ''}`}
      style={{ userSelect: 'none' }}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onDoubleClick={() => onRowDoubleClick?.(row.original.id)}
                onClick={() => handleRowClick(row.original.id)}
                className={`cursor-pointer hover:bg-gray-100 ${
                  selectedRowId === row.original.id ? 'bg-gray-200' : ''
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {t('customTable.noResult')}.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="space-y-4">
      <DataTableToolbar<TData, Record<string, string>>
        table={table}
        searchPlaceholder={searchPlaceholder}
        searchColumn={searchColumn}
        filters={filters}
        titles={titles}
      />
      {withContainer ? (
        <ContainerComponent withBg={true}>{TableContent}</ContainerComponent>
      ) : (
        TableContent
      )}
      <DataTablePagination table={table} />
    </div>
  )
}
