import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/CustomTableComponents/DataTableViewOptions'
import { DataTableFacetedFilter } from '@/components/CustomTableComponents/DataTableFacetedFilter'
import React from 'react'

interface FilterOption {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface DataTableToolbarProps<TData, TTitles> {
  table: Table<TData>
  searchPlaceholder: string
  searchColumn: string
  filters: {
    title: string
    column: string
    options: FilterOption[]
  }[]
  titles: TTitles
}

export function DataTableToolbar<TData, TTitles>({
  table,
  searchPlaceholder,
  searchColumn,
  filters,
  titles,
}: DataTableToolbarProps<TData, TTitles>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const { t } = useTranslation()

  // Определяем, является ли текущий фильтр серверным
  const isServerSideFilter = (columnId: string) => {
    // Список фильтров, которые должны обрабатываться на сервере
    const serverSideFilters = [
      'ownerType',
      'product',
      'creditType',
      'stage',
      'clientId',
    ]
    return serverSideFilters.includes(columnId)
  }

  // Функция для сброса только серверных фильтров
  const resetServerFilters = () => {
    const currentFilters = table.getState().columnFilters
    const newFilters = currentFilters.filter(
      (filter) => !isServerSideFilter(filter.id)
    )
    table.resetColumnFilters(false) // Не вызываем обработчики сразу

    // Применяем только клиентские фильтры
    newFilters.forEach((filter) => {
      table.getColumn(filter.id)?.setFilterValue(filter.value)
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={searchPlaceholder}
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[9rem] lg:w-[16rem]"
        />
        {filters.map(
          (filter) =>
            table.getColumn(filter.column) && (
              <DataTableFacetedFilter
                key={filter.column}
                column={table.getColumn(filter.column)}
                title={filter.title}
                options={filter.options}
              />
            )
        )}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={resetServerFilters}
            className="h-8 px-2 lg:px-3"
          >
            {t('customTable.toolbar.reset')}
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions<TData, TTitles> titles={titles} table={table} />
    </div>
  )
}
