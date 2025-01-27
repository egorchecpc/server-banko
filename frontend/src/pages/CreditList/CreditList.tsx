import { CreditListModule } from '@/modules/CreditListModule/CreditListModule'
import { useGetCreditListData } from '@/hooks/apiHooks/dashboardHooks/useGetCreditListData'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from '@tanstack/react-router'

export const CreditListPage = () => {
  const {
    data: CreditListData,
    isLoading: creditListLoading,
    isError: creditListError,
  } = useGetCreditListData()

  const isLoading = creditListLoading
  const isError = creditListError

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error occurred while fetching data</div>
  }
  return (
    <div className="p-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/reports">Главная страница</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Список кредитов</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {CreditListData && <CreditListModule data={CreditListData} />}
    </div>
  )
}
