import { ColumnDef, Row } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/CustomTableComponents/DataTableColumnHeader'
import { CreditListData } from '@/models/CreditList'
import { AlertTriangle, CheckCircle, XCircle, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stageIcons = {
  '1': <CheckCircle className="h-5 w-5 text-green-500" />,
  '2': <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  '3': <XCircle className="h-5 w-5 text-red-500" />,
}

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

export const columns: ColumnDef<CreditListData, unknown>[] = [
  {
    accessorKey: 'clientId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID договора" />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 w-full items-center justify-center">
        {row.getValue('clientId')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID клиента" />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 w-full items-center justify-center">
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
      <div className="flex h-10 w-full items-center justify-center">
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
      <div className="flex h-10 w-full items-center justify-center">
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
      <div className="flex h-10 w-full items-center justify-center">
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
      <div className="flex h-10 w-full items-center justify-center">
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
    cell: ({ row }) => {
      const stage = row.getValue<string>('stage')

      return (
        <div className="flex h-10 w-full items-center px-2">
          {stageIcons[stage]}
          <div className="ml-2 flex w-full flex-col">
            <div className="text-sm font-medium">{`Стадия ${stage}`}</div>
          </div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 font-medium"
      >
        Дата выдачи
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex h-10 w-full items-center justify-center whitespace-nowrap">
        {row.getValue('date')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'loanRepaymentDate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 font-medium"
      >
        Дата погашения
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex h-10 w-full items-center justify-center">
        {row.getValue('loanRepaymentDate')}
      </div>
    ),
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: 'grossCarryingAmount',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 font-medium"
      >
        ВБС
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex h-10 w-full items-center justify-center">
        {typeof row.getValue('grossCarryingAmount') === 'number'
          ? new Intl.NumberFormat('ru-RU', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(row.getValue('grossCarryingAmount'))
          : row.getValue('grossCarryingAmount')}
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
      <div className="flex h-10 w-full items-center justify-center">
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
      <div className="flex h-10 w-full items-center justify-center">
        {row.getValue('prepaymentRate')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'expectedCreditLossesAmount',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 font-medium"
      >
        ECL
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex h-10 w-full items-center justify-center">
        {typeof row.getValue('expectedCreditLossesAmount') === 'number'
          ? new Intl.NumberFormat('ru-RU', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(row.getValue('expectedCreditLossesAmount'))
          : row.getValue('expectedCreditLossesAmount')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'reservationPercentage',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 font-medium"
      >
        %
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue<number>('reservationPercentage')
      const percentage = value * 100
      const formattedValue = percentage.toFixed(2)

      let barColor = ''
      if (percentage < 15) {
        barColor = 'bg-green-500'
      } else if (percentage >= 15 && percentage <= 35) {
        barColor = 'bg-yellow-500'
      } else {
        barColor = 'bg-red-500'
      }

      return (
        <div className="flex h-10 w-full items-center justify-start px-2">
          <div className="flex w-full flex-col space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{formattedValue}%</div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full ${barColor}`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
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
      <div className="flex h-10 w-full items-center justify-center">
        {row.getValue('mpd')}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
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
