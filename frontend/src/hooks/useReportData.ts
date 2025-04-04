import { useGetReportsData } from './apiHooks/commonHooks/useGetReportsData'

export const useReportData = (reportId: string) => {
  const { data: reports, isLoading, error } = useGetReportsData()

  const report = reports?.find((report) => report.id === reportId)

  return {
    report,
    isLoading,
    error,
    isReportFound: Boolean(report),
  }
}

export const useReportDataWithValidation = (reportId: string) => {
  const { report, isLoading, error, isReportFound } = useReportData(reportId)

  const customError =
    !isReportFound && !isLoading
      ? new Error(`Report with id ${reportId} not found`)
      : error

  return {
    report,
    isLoading,
    error: customError,
    isReportFound,
  }
}
