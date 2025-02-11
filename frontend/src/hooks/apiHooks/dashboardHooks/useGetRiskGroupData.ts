import { useQueries, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { RiskGroupItem } from '@/models/RiskGoupItem'
import { useEffect } from 'react'

export const useGetRiskGroupData = (date: string) => {
  const queryClient = useQueryClient()
  const endpoints = [
    `https://banko-r-backend.stacklevel.group/api/ecl/sum?date=${date}`,
    `https://banko-r-backend.stacklevel.group/api/ecl/reservation/sum?date=${date}`,
    `https://banko-r-backend.stacklevel.group/api/ecl/WBS/sum?date=${date}`,
  ]

  const queries = useQueries({
    queries: endpoints.map((endpoint) => ({
      queryKey: ['RiskGroupData', endpoint, date],
      queryFn: async () => {
        const { data } = await axios.get<RiskGroupItem[]>(endpoint)
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

  return {
    eclAmount: eclAmount.data,
    percentIFRS: percentIFRS.data,
    vbsAmount: vbsAmount.data,
    isLoading: queries.some((query) => query.isLoading),
    isError: queries.some((query) => query.isError),
    errors: queries.map((query) => query.error),
  }
}
