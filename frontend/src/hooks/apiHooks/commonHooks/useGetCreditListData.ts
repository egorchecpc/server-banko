import { useQuery } from '@tanstack/react-query'
import { CreditListData, PaginatedResponse } from '@/models/CreditListTest'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useGetCreditListData = (
  page: number,
  size: number,
  sortField?: string,
  sortDirection?: string,
  filterProperty?: string,
  filterValue?: string,
  searchText?: string
) => {
  return useQuery<PaginatedResponse<CreditListData>, Error>({
    queryKey: [
      'CreditListData',
      page,
      size,
      sortField,
      sortDirection,
      filterProperty,
      filterValue,
      searchText,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      })

      // Add sort field and direction if available
      if (sortField) {
        params.append('sortProperties', sortField)

        // Add direction if available
        if (sortDirection) {
          params.append('direction', sortDirection)
        }
      }

      // Add filter parameters if they exist
      if (filterProperty && filterValue) {
        params.append('filterProperty', filterProperty)
        params.append('filterValue', filterValue)
      }

      // Add search by contractId if search text exists
      if (searchText) {
        params.append('filterProperty', 'contractId')
        params.append('filterValue', searchText)
      }

      const { data } = await axiosConfigFinal.get(
        API_ENDPOINTS.COMMON.CREDIT_LIST.GET_CONTRACTS,
        {
          params: Object.fromEntries(params),
        }
      )

      return data
    },
  })
}
