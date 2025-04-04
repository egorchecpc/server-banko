import React, { FC } from 'react'
import { Navbar } from '@/components/Navbar/Navbar'
import UserNav from '@/components/UserNav/UserNav'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useReportId } from '@/context/ReportIdContext'
import { useReportDataWithValidation } from '@/hooks/useReportData'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { reportType } from '@/modules/HeaderModule/HeaderModuleConfig'

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
  const navigate = useNavigate()
  const { reportId } = useReportId()
  const { report } = useReportDataWithValidation(reportId || '')
  const reportName = report?.title || 'Черновик'
  const basicReportDate = new Date(report?.debtorData.date || '01.01.2024')
  const search: { type: string } = useSearch({ strict: false })
  const reportDate =
    basicReportDate.toLocaleDateString('ru-RU') || 'Дата не найдена'

  const handleCreditTypeClick = () => {
    navigate({
      to: `/reports/${reportId}/credit-type`,
      search: { id: reportId },
    })
  }

  return (
    <header className="mb-5 w-full bg-white shadow">
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
            <Link to="/apps">
              <img src="/img/logo.svg" alt="BANKO" className="w-32" />
            </Link>
          )}
          {!withoutSidebar && <SidebarTrigger />}
          {!withoutNav && navItems && <Navbar navItems={navItems} />}
        </div>
        <div className="flex items-center gap-8">
          {!withoutExportBtn && !isNewReport && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="primary">Текущий отчёт</Button>
              </PopoverTrigger>
              <PopoverContent
                sideOffset={5}
                collisionPadding={10}
                avoidCollisions={true}
                className="w-80"
                style={{ transform: 'scale(0.8)' }}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Информация об отчёте</h4>
                    <div className="text-sm">
                      <p>Отчёт: {reportName}</p>
                      <p>Дата: {reportDate}</p>
                      <p>
                        Текущий тип кредита: <b>{reportType[search.type]}</b>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="primary" className="w-full">
                      Сохранить отчёт
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <UserNav userData={userData} />
        </div>
      </div>
    </header>
  )
}
