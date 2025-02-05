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
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'

export const CreditListModule: FC = () => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const { data, isLoading } = useGetCreditListData(page, pageSize)
  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <div className="hidden h-full flex-1 flex-col md:flex">
      <div className="flex items-center justify-between">
        <div className="mb-5 text-2xl font-bold leading-38 text-black-900">
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
      />
    </div>
  )
}
