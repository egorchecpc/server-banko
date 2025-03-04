import { CreditListModule } from '@/modules/CreditListModule/CreditListModule'
import { useGetCreditListData } from '@/hooks/apiHooks/dashboardHooks/useGetCreditListData'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'

export const CreditListPage = () => {
  const {
    data: CreditListData,
    isLoading: creditListLoading,
    isError: creditListError,
  } = useGetCreditListData()
  const isLoading = creditListLoading
  const isError = creditListError

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (isError) {
    return <div>Error occurred while fetching data</div>
  }
  return (
    <div className="p-4 px-10">{CreditListData && <CreditListModule />}</div>
  )
}
