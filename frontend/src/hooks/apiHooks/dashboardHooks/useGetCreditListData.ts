import { useQuery } from '@tanstack/react-query'
import axiosConfigMock from '@/services/axiosConfigMock'
import { API_ENDPOINTS } from '@/services/endpoints'
import { CreditListData } from '@/models/CreditList'

export const useGetCreditListData = () => {
  return useQuery<CreditListData[], Error>({
    queryKey: ['CreditListData'],
    queryFn: async () => {
      const { data } = await axiosConfigMock.get(
        API_ENDPOINTS.GET_CREDIT_LIST_DATA
      )
      return data
    },
  })
}
