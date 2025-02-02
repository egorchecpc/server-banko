import { DataTable } from '@/components/CustomTableComponents/DataTable'
import {
  columns,
  credit_types,
  debtor_types,
  product_types,
  stage_types,
  titles,
} from '@/modules/CreditListModule/CreditListConfig'
import { CreditListData } from '@/models/CreditList'
import { FC } from 'react'
import { ExportCreditList } from '@/components/ExportCreditListComponent/ExportCreditList'

interface CreditListModuleProps {
  data: CreditListData[]
}
export const CreditListModule: FC<CreditListModuleProps> = ({ data }) => {
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
        data={data}
        titles={titles}
        filters={[
          {
            title: 'Тип должника',
            column: 'debtor_type',
            options: debtor_types,
          },
          {
            title: 'Вид кредита',
            column: 'credit_type',
            options: credit_types,
          },
          {
            title: 'Вид продукта',
            column: 'product_type',
            options: product_types,
          },
          {
            title: 'Стадия',
            column: 'stage',
            options: stage_types,
          },
        ]}
        searchPlaceholder="Поиск по клиенту"
        searchColumn="client_id"
        withContainer={true}
        initialSelectedId="0"
      />
    </div>
  )
}
