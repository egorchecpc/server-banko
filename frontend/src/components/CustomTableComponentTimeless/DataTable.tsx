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

import { ContainerComponent } from '@/components/ContainerComponent/ContainerComponent'
import { DataTableToolbar } from '@/components/CustomTableComponentTimeless/DataTableToolbar'
import { DataTablePagination } from '@/components/CustomTableComponentTimeless/DataTablePagination'
import { useEffect, useState } from 'react'

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
  currentPage: number
  pageSize: number
  totalPages: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
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
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [selectedRowId, setSelectedRowId] = useState<string | null>(
    initialSelectedId || null
  )
  const { t } = useTranslation()

  useEffect(() => {
    if (initialSelectedId) {
      setSelectedRowId(initialSelectedId)
    } else if (data.length > 0) {
      setSelectedRowId(data[0].id)
    }
  }, [rowSelection])

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
      className={`h-full w-full overflow-auto rounded-lg ${withCustomStyle ? 'flex overflow-hidden rounded-xl border border-[#d0dbe7] bg-slate-50' : ''}`}
    >
      <Table className="!h-full min-h-screen w-full table-auto">
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
                  selectedRowId === row.original.id ? '!bg-gray-100' : ''
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
      <DataTablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}
