import { useQueries } from '@tanstack/react-query'
import { RiskGroupItem } from '@/models/RiskGoupItem'
import axiosConfigFinal from '@/services/axiosConfigFinal'
import { API_ENDPOINTS } from '@/services/endpoints'
import { formatAsCurrency, formatAsPercent } from '@/utils/formatters'

export const useGetRiskGroupData = (date: string) => {
  const endpoints = [
    API_ENDPOINTS.DASHBOARD.ECL.RISK_GROUP_SUM(date),
    API_ENDPOINTS.DASHBOARD.ECL.RISK_GROUP_RESERVATION_SUM(date),
    API_ENDPOINTS.DASHBOARD.ECL.RISK_GROUP_WBS_SUM(date),
  ]

  const queries = useQueries({
    queries: endpoints.map((endpoint) => ({
      queryKey: ['RiskGroupData', endpoint],
      queryFn: async () => {
        const { data } = await axiosConfigFinal.get<RiskGroupItem[]>(endpoint)
        return data
      },
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!date,
    })),
  })

  const [eclQuery, ifrsQuery, wbsQuery] = queries

  return {
    eclAmount: formatAsCurrency(eclQuery.data),
    percentIFRS: formatAsPercent(ifrsQuery.data),
    vbsAmount: formatAsCurrency(wbsQuery.data),
    isLoading: queries.some((q) => q.isLoading),
    isError: queries.some((q) => q.isError),
    errors: queries.map((q) => q.error),
  }
}
