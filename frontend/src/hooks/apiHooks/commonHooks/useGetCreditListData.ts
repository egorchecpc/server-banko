import { useQuery } from '@tanstack/react-query'
import { CreditListData, PaginatedResponse } from '@/models/CreditListTest'
import axios from 'axios'

export const useGetCreditListData = (
  page: number,
  size: number,
  sort?: string
) => {
  return useQuery<PaginatedResponse<CreditListData>, Error>({
    queryKey: ['CreditListData', page, size, sort],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...(sort ? { sort } : {}),
      })
      console.log('Requesting with params:', {
        page,
        size,
        sort,
        url: `${'https://banko-r-backend.stacklevel.group/api/contracts'}?${params.toString()}`,
      })
      const { data } = await axios.get(
        `${'https://banko-r-backend.stacklevel.group/api/contracts'}?${params.toString()}`
      )
      console.log('Received data:', data)
      return data
    },
  })
}
