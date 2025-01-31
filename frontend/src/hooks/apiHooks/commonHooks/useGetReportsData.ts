import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { API_ENDPOINTS } from '@/services/endpoints'
import type { ProfileReportData } from '@/models/ProfileReport'
import { useMemo } from 'react'
import { formatMacroDataFromServer } from '@/utils/formatMacroDataFromServer'
import { DebtorData } from '@/models/DebtorData'

export const useGetReportsData = () => {
  return useQuery<ProfileReportData[], Error>({
    queryKey: ['ProfileReportsData'],
    queryFn: async () => {
      const { data } = await axiosConfig.get(
        API_ENDPOINTS.GET_PROFILE_REPORTS_DATA
      )
      console.log(data)
      return data
    },
  })
}

export const useGetReportDataById = (reportId: string) => {
  const { data: reports, isLoading, error } = useGetReportsData()

  const processedData = reports?.find(
    (report) => report.id === reportId
  )?.macroData

  const transformedData = useMemo(
    () => formatMacroDataFromServer(processedData),
    [processedData]
  )

  return {
    macroData: transformedData,
    isLoading,
    error,
  }
}

export const useGetDebtorDataById = (reportId: string) => {
  const { data: reports, isLoading, error } = useGetReportsData()

  const debtorData = useMemo(() => {
    const report = reports?.find((report) => report.id === reportId)
    if (!report?.debtorData) return null

    return {
      debtorType: report.debtorData.debtorType || 'default',
      creditType: report.debtorData.creditType || 'default',
      productType: report.debtorData.productType || 'default',
      date: report.debtorData.date
        ? new Date(report.debtorData.date)
        : undefined,
    } as DebtorData
  }, [reports, reportId])

  return {
    debtorData,
    isLoading,
    error,
  }
}
