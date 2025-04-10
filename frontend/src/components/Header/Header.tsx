import React, { FC, useState } from 'react'
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
import {
  Link,
  useLocation,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import { reportType } from '@/modules/HeaderModule/HeaderModuleConfig'
import { getBreadcrumbsFromPath } from '@/utils/breadcrumbs'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { DatasetModal } from '@/modules/DatasetModule/DatasetModule'

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
  const location = useLocation()
  const { reportId } = useReportId()
  const { report } = useReportDataWithValidation(reportId || '')
  const search: { type: string } = useSearch({ strict: false })
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname)

  // Состояние для модального окна загрузки данных
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState(false)
  const [currentDataset, setCurrentDataset] = useState({
    id: 'ds-2025-04-03-981465',
    name: 'Загруженные данные',
    date: '03.04.2025',
  })

  const handleContinue = () => {
    setIsDatasetModalOpen(false)
  }

  const handleDatasetUpdate = (updatedDataset) => {
    setCurrentDataset(updatedDataset)
    navigate({ to: '/analyzer', search: { type: search.type } })
  }

  const reportName = report?.title || 'Черновик'
  const basicReportDate = new Date(report?.debtorData.date || '01.01.2024')
  const reportDate =
    basicReportDate.toLocaleDateString('ru-RU') || 'Дата не найдена'

  const handleCreditTypeClick = () => {
    navigate({
      to: `/reports/${reportId}/credit-type`,
      search: { id: reportId },
    })
  }

  // Проверяем, находимся ли мы на странице /reports
  const isReportsPage = location.pathname === '/reports'

  return (
    <header className="mb-5 w-full bg-white shadow">
      <div className="mx-5 flex items-center justify-between p-5">
        <div className="mr-3 flex w-full items-center justify-between gap-6">
          {/* Левая часть */}
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
                <img src="/img/logo.svg" alt="BANKO" className="w-52" />
              </Link>
            )}
            {!withoutSidebar && <SidebarTrigger />}

            {/* Хлебные крошки */}
            {breadcrumbs.length > 0 && (
              <Breadcrumb className="hidden md:block">
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, i) => (
                    <React.Fragment key={i}>
                      <BreadcrumbItem>
                        {crumb.href ? (
                          <BreadcrumbLink asChild>
                            <Link to={crumb.href}>{crumb.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>

          {/* Правая часть */}
          {!withoutNav && navItems && <Navbar navItems={navItems} />}
        </div>

        {/* Дополнительные элементы справа */}
        <div className="flex items-center gap-8">
          {/* Кнопка "Загрузить данные" только на странице /reports */}
          {isReportsPage && (
            <Button
              variant="primary"
              onClick={() => setIsDatasetModalOpen(true)}
            >
              Загрузить данные
            </Button>
          )}

          {!withoutExportBtn && !isNewReport && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="primary">Информация об отчёте</Button>
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

      {/* Модальное окно для загрузки данных */}
      <DatasetModal
        isOpen={isDatasetModalOpen}
        onClose={() => setIsDatasetModalOpen(false)}
        currentDataset={currentDataset}
        onContinue={handleContinue}
        type={search.type || 'retail'}
        onDatasetUpdate={handleDatasetUpdate}
      />
    </header>
  )
}
