import {
  columns,
  credit_types,
  debtor_types,
  product_types,
  stage_types,
  titles,
} from '@/modules/CreditListModule/CreditListConfig'
import { FC } from 'react'
import { ExportCreditList } from '@/components/ExportCreditListComponent/ExportCreditList'
import { DataTable } from '@/components/CustomTableComponentTimeless/DataTable'
import { SortingState, ColumnFiltersState } from '@tanstack/react-table'
import { PaginatedResponse, CreditListData } from '@/models/CreditListTest'

interface CreditListModuleProps {
  data: PaginatedResponse<CreditListData>
  currentPage: number
  pageSize: number
  totalPages: number
  sorting: SortingState
  columnFilters: ColumnFiltersState
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onSortingChange: (sorting: SortingState) => void
  onFiltersChange: (filters: ColumnFiltersState) => void
}

export const CreditListModule: FC<CreditListModuleProps> = ({
  data,
  currentPage,
  pageSize,
  totalPages,
  sorting,
  columnFilters,
  onPageChange,
  onPageSizeChange,
  onSortingChange,
  onFiltersChange,
}) => {
  return (
    <div className="hidden h-full w-full flex-1 flex-col md:flex">
      <div className="flex items-center justify-between">
        <div className="mb-5 text-2xl font-bold leading-38 text-black-1000">
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
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        initialSorting={sorting}
        onSortingChange={onSortingChange}
        initialFilters={columnFilters}
        onFiltersChange={onFiltersChange}
      />
    </div>
  )
}
