import { FC } from 'react'
import { Navbar } from '@/components/Navbar/Navbar'
import UserNav from '@/components/UserNav/UserNav'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useReportId } from '@/context/ReportIdContext'
import { useReportDataWithValidation } from '@/hooks/apiHooks/commonHooks/useReportData'
export interface HeaderProps {
  navItems?: { [key: string]: string }
  userData: { [key: string]: string }
  withoutNav?: boolean
  withoutSidebar?: boolean
  withoutExportBtn?: boolean
  withLogo?: boolean
  withBackBtn?: boolean
  isNewReport?: boolean
}

export const Header: FC<HeaderProps> = ({
  navItems,
  userData,
  withoutNav,
  withoutSidebar,
  withoutExportBtn,
  withLogo,
  withBackBtn,
  isNewReport,
}) => {
  const { reportId } = useReportId()
  const { report } = useReportDataWithValidation(reportId || '')
  const reportName = report?.title || 'Черновик'
  const basicReportDate = new Date(report?.debtorData.date || '01.01.2024')
  const reportDate =
    basicReportDate.toLocaleDateString('ru-RU') || 'Дата не найдена'
  return (
    <header className="mb-5 w-[100%] bg-white shadow">
      <div className="mx-5 flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          {withBackBtn && (
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </Button>
          )}
          {withLogo && (
            <h2 className="text-2xl font-extrabold leading-9 text-blue-900">
              ЛОГО
            </h2>
          )}
          {!withoutSidebar && <SidebarTrigger />}
          {!withoutNav && navItems && <Navbar navItems={navItems} />}
        </div>
        <div className="flex items-center gap-5">
          {!withoutExportBtn && !isNewReport && (
            <div className="flex flex-col gap-0 rounded-lg border p-2 !py-1 text-sm font-medium">
              <div>Отчёт: {reportName}</div>
              <div>Дата: {reportDate}</div>
            </div>
          )}
          {!withoutNav && <Button variant="primary">Сохранить отчёт</Button>}

          <UserNav userData={userData} />
        </div>
      </div>
    </header>
  )
}
