import { CreditListModule } from '@/modules/CreditListModule/CreditListModule'
import { useGetCreditListData } from '@/hooks/apiHooks/commonHooks/useGetCreditListData'
import { useLoading } from '@/context/LoadingContext'
import { useEffect, useState } from 'react'
import { SortingState, ColumnFiltersState } from '@tanstack/react-table'

export const CreditListPage = () => {
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

  const {
    data: CreditListData,
    isLoading,
    isError,
  } = useGetCreditListData(
    page,
    pageSize,
    sortField,
    sortDirection,
    filterProperty,
    filterValue,
    searchText
  )

  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [isLoading, setIsLoading])

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting)
    setPage(0)
  }

  const handleFiltersChange = (newFilters: ColumnFiltersState) => {
    setColumnFilters(newFilters)
    setPage(0)
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>
  }

  return (
    <div className="h-full min-h-[125vh] p-4 px-10">
      {CreditListData && (
        <CreditListModule
          data={CreditListData}
          currentPage={page}
          pageSize={pageSize}
          totalPages={CreditListData.totalPages ?? 0}
          sorting={sorting}
          columnFilters={columnFilters}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSortingChange={handleSortingChange}
          onFiltersChange={handleFiltersChange}
        />
      )}
    </div>
  )
}
