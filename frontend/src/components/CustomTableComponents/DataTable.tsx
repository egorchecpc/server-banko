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
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const { t } = useTranslation()
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

  const TableContent = (
    <div
      className={`overflow-auto rounded-lg ${withCustomStyle ? 'flex overflow-hidden rounded-xl border border-[#d0dbe7] bg-slate-50' : ''}`}
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
                onClick={() => onRowClick?.(row.original.id)}
                className="cursor-pointer hover:bg-gray-100"
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
