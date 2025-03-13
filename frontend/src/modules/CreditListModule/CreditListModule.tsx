import {
  columns,
  credit_types,
  debtor_types,
  product_types,
  stage_types,
  titles,
} from '@/modules/CreditListModule/CreditListConfig'
import { FC, useState } from 'react'
import { ExportCreditList } from '@/components/ExportCreditListComponent/ExportCreditList'
import { useGetCreditListData } from '@/hooks/apiHooks/commonHooks/useGetCreditListData'
import { DataTable } from '@/components/CustomTableComponentTimeless/DataTable'
import { SortingState, ColumnFiltersState } from '@tanstack/react-table'

export const CreditListModule: FC = () => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const sortField = sorting.length > 0 ? sorting[0].id : undefined
  const sortDirection =
    sorting.length > 0 ? (sorting[0].desc ? 'DESC' : 'ASC') : undefined

  // Handle different types of filters
  const activeFilter = columnFilters.find((filter) =>
    ['ownerType', 'creditType', 'product', 'stage'].includes(filter.id)
  )

  // Check if we have a search filter for contractId
  const searchFilter = columnFilters.find((filter) => filter.id === 'clientId')

  // Determine filter property and value
  let filterProperty: string | undefined
  let filterValue: string | undefined

  if (activeFilter) {
    filterProperty = activeFilter.id
    filterValue =
      Array.isArray(activeFilter.value) && activeFilter.value.length
        ? activeFilter.value[0]
        : (activeFilter.value as string)
  }

  let searchText: string | undefined
  if (searchFilter) {
    searchText = searchFilter.value as string
  }

  const { data, isLoading } = useGetCreditListData(
    page,
    pageSize,
    sortField,
    sortDirection,
    filterProperty,
    filterValue,
    searchText
  )

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting)
    setPage(0)
  }

  const handleFiltersChange = (newFilters: ColumnFiltersState) => {
    setColumnFilters(newFilters)
    setPage(0)
  }

  return (
    <div className="hidden h-full w-full flex-1 flex-col md:flex">
      <div className="flex items-center justify-between">
        <div className="text-black-1000 mb-5 text-2xl font-bold leading-38">
          Список всех кредитов
        </div>
        <ExportCreditList />
      </div>
      <DataTable
        columns={columns}
        data={data?.content ?? []}
        titles={titles}
        filters={[
          {
            title: 'Тип должника',
            column: 'ownerType',
            options: debtor_types,
          },
          {
            title: 'Вид кредита',
            column: 'creditType',
            options: credit_types,
          },
          {
            title: 'Вид продукта',
            column: 'product',
            options: product_types,
          },
          {
            title: 'Стадия',
            column: 'stage',
            options: stage_types,
          },
        ]}
        searchPlaceholder="Поиск по клиенту"
        searchColumn="clientId"
        withContainer={true}
        currentPage={page}
        pageSize={pageSize}
        totalPages={data?.totalPages ?? 0}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        initialSorting={sorting}
        onSortingChange={handleSortingChange}
        initialFilters={columnFilters}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  )
}
