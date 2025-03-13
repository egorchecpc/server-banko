import { CreditListModule } from '@/modules/CreditListModule/CreditListModule'
import { useGetCreditListData } from '@/hooks/apiHooks/dashboardHooks/useGetCreditListData'
import { useLoading } from '@/context/LoadingContext'
import { useEffect } from 'react'

export const CreditListPage = () => {
  const { data: CreditListData, isLoading, isError } = useGetCreditListData()

  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [isLoading, setIsLoading])

  if (isError) {
    return <div>Error occurred while fetching data</div>
  }
  return (
    <div className="h-full min-h-[125vh] p-4 px-10">
      {CreditListData && <CreditListModule />}
    </div>
  )
}
