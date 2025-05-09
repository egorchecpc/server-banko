import { ColumnDef, Row } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/CustomTableComponents/DataTableColumnHeader'
import { DataTableRowActions } from '@/components/CustomTableComponents/DataTableRowActions'
import { ArrowUpIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { CheckCircleIcon } from 'lucide-react'

const customFilterFn = (
  row: Row<Task>,
  columnId: string,
  filterValue: unknown
) => {
  if (Array.isArray(filterValue)) {
    return filterValue.includes(row.getValue(columnId))
  }
  return row.getValue(columnId) === filterValue
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Изменён" />
    ),
    cell: ({ row }) => (
      <div className="mx-auto flex h-10 w-[6rem] items-center text-center">
        {row.getValue('date')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'create_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Отчётная дата" />
    ),
    cell: ({ row }) => (
      <div className="mx-auto flex h-10 w-[6rem] items-center text-center">
        {row.getValue('date')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'label',
    header: () => null,
    cell: () => null,
    enableSorting: true,
    enableHiding: true,
    filterFn: customFilterFn,
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)
      return (
        <div className="flex h-10 items-center justify-start gap-1">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[31rem] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      // Определяем цвет иконки в зависимости от статуса
      const iconColorClass =
        status.value === 'В процессе проверки'
          ? 'text-amber-500' // Оранжевый цвет для статуса "В процессе проверки"
          : status.value === 'Согласованный'
            ? 'text-green-500' // Зеленый цвет для статуса "Согласованный"
            : 'text-muted-foreground' // Дефолтный цвет для других статусов

      return (
        <div className="flex h-10 items-center justify-start">
          {status.icon && (
            <status.icon className={`mr-2 h-4 w-4 ${iconColorClass}`} />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Приоритет" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue('priority')
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex h-10 items-center justify-center">
          {priority.icon && (
            <priority.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: 'owner',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Владелец" />
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center justify-center">
        {row.getValue('owner')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: customFilterFn,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} labels={labels} />,
  },
]

export type Task = {
  id: string
  title: string
  status: string
  label: string
  priority: string
  date: string
  owner: string
}

export const labels = [
  {
    value: 'Черновик',
    label: 'Черновик',
  },
  {
    value: 'Основной',
    label: 'Основной',
  },
]
export const statuses = [
  {
    value: 'В процессе проверки',
    label: 'В процессе проверки',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'Согласованный',
    label: 'Согласованный',
    icon: CheckCircleIcon,
  },
]
export const priorities = [
  {
    label: 'Важный',
    value: 'Важный',
    icon: ArrowUpIcon,
  },
]
export const owners = [
  {
    label: 'Риск-менеджер 1',
    value: 'Риск-менеджер 1',
    icon: QuestionMarkCircledIcon,
  },
  {
    label: 'Риск-менеджер 2',
    value: 'Риск-менеджер 2',
    icon: QuestionMarkCircledIcon,
  },
  {
    label: 'Риск-менеджер 3',
    value: 'Риск-менеджер 3',
    icon: QuestionMarkCircledIcon,
  },
]
export const titles = {
  status: 'Статус',
  priority: 'Приоритет',
  owner: 'Владелец',
  label: 'Лейбл',
}
