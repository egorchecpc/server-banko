import { ColumnDef, Row } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/CustomTableComponents/DataTableColumnHeader'
import { CreditListData } from '@/models/CreditList'

const customFilterFn = (
  row: Row<CreditListData>,
  columnId: string,
  filterValue: unknown
) => {
  if (Array.isArray(filterValue)) {
    return filterValue.includes(row.getValue(columnId))
  }
  return row.getValue(columnId) === filterValue
}

export const columns: ColumnDef<{ id: string }, unknown>[] = [
  {
    accessorKey: 'clientId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID клиента" />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('clientId')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID договора" />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('id')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Валюта" />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('currency')}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: 'ownerType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Тип должника" />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('ownerType')}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: 'product',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Вид продукта" />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('product')}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: 'creditType',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Вид кредита"
        allowHide={true}
      />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('creditType')}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'stage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Стадия" allowHide={true} />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('stage')}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Дата выдачи"
        allowHide={true}
      />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center whitespace-nowrap">
        {row.getValue('date')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'loanRepaymentDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата выдачи" />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('loanRepaymentDate')}
      </div>
    ),
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: 'grossCarryingAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ВБС" allowHide={true} />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('grossCarryingAmount')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'lgd',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LGD" allowHide={true} />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('lgd')}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'prepaymentRate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PR" allowHide={true} />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('prepaymentRate')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'expectedCreditLossesAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ECL" allowHide={true} />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('expectedCreditLossesAmount')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'reservationPercentage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="%" allowHide={true} />
    ),
    cell: ({ row }) => {
      const value = row.getValue<number>('reservationPercentage')
      const formattedValue = (value * 100).toFixed(2)
      return (
        <div className="flex h-10 items-center justify-center">
          {formattedValue}%
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'mpd',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="mpd" allowHide={true} />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('mpd')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
]

export const debtor_types = [
  {
    value: 'Розничный',
    label: 'Розничный',
  },
  {
    value: 'Корпоративный',
    label: 'Корпоративный',
  },
]

export const credit_types = [
  {
    value: 'Потребительские кредиты',
    label: 'Потребительский кредиты',
  },
  {
    value: 'Ипотечные кредиты',
    label: 'Ипотечные кредиты',
  },
  {
    value: 'Овердрафт',
    label: 'Овердрафт',
  },
]

export const product_types = [
  {
    value: 'Ипотека 10 лет',
    label: 'Ипотека 10 лет',
  },
  {
    value: 'Ипотека 20 лет',
    label: 'Ипотека 20 лет',
  },
  {
    value: 'На самое важное',
    label: 'На самое важное',
  },
  {
    value: 'Овердрафт 100 дней',
    label: 'Овердрафт 100 дней',
  },
]

export const stage_types = [
  {
    value: '1',
    label: '1 стадия',
  },
  {
    value: '2',
    label: '2 стадия',
  },
  {
    value: '3',
    label: '3 стадия',
  },
]

export const titles = {
  clientId: 'ID клиента',
  id: 'ID договора',
  currency: 'Валюта',
  ownerType: 'Тип должника',
  product: 'Вид продукта',
  creditType: 'Вид кредита',
  stage: 'Стадия',
  date: 'Дата выдачи',
  loanRepaymentDate: 'Дата погашения',
  grossCarryingAmount: 'ВБС',
  lgd: 'LGD',
  prepaymentRate: 'PR',
  expectedCreditLossesAmount: 'ECL',
  reservationPercentage: '%',
  mpd: 'MPD',
}
