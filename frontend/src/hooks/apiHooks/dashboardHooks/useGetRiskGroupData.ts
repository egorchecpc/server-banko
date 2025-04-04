import { useQueries } from '@tanstack/react-query'
import { RiskGroupItem, RiskGroupItemFormatted } from '@/models/RiskGoupItem'
import axiosConfigFinal from '@/services/axiosConfigFinal'

export const useGetRiskGroupData = (date: string) => {
  const endpoints = [
    `/ecl/sum?date=${date}`,
    `/ecl/reservation/sum?date=${date}`,
    `/ecl/WBS/sum?date=${date}`,
  ]

  const queries = useQueries({
    queries: endpoints.map((endpoint) => ({
      queryKey: ['RiskGroupData', endpoint, date],
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

  const [eclAmount, percentIFRS, vbsAmount] = queries

  const formatPercentData = (
    data: RiskGroupItem[] | undefined
  ): RiskGroupItem[] | undefined => {
    if (!data) return undefined

    return data.map((item) => ({
      ...item,
      stage1: Number((item.stage1 * 100).toFixed(2)),
      stage2: Number((item.stage2 * 100).toFixed(2)),
      stage3: Number((item.stage3 * 100).toFixed(2)),
      poci: Number((item.poci * 100).toFixed(2)),
      total: Number((item.total * 100).toFixed(2)),
    }))
  }

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatNormalData = (
    data: RiskGroupItem[] | undefined
  ): RiskGroupItemFormatted[] | undefined => {
    if (!data) return undefined

    return data.map((item) => ({
      ...item,
      stage1: formatCurrency(Number(item.stage1.toFixed(2))),
      stage2: formatCurrency(Number(item.stage2.toFixed(2))),
      stage3: formatCurrency(Number(item.stage3.toFixed(2))),
      poci: formatCurrency(Number(item.poci.toFixed(2))),
      total: formatCurrency(Number(item.total.toFixed(2))),
    }))
  }

  return {
    eclAmount: formatNormalData(eclAmount.data),
    percentIFRS: formatPercentData(percentIFRS.data),
    vbsAmount: formatNormalData(vbsAmount.data),
    isLoading: queries.some((query) => query.isLoading),
    isError: queries.some((query) => query.isError),
    errors: queries.map((query) => query.error),
  }
}
