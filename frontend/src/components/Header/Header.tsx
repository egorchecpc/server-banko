import { FC } from 'react'
import { Navbar } from '@/components/Navbar/Navbar'
import UserNav from '@/components/UserNav/UserNav'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useReport } from '@/context/DateContext'
import { Button } from '@/components/ui/button'

export interface HeaderProps {
  navItems?: { [key: string]: string }
  userData: { [key: string]: string }
  withoutNav?: boolean
  withoutSidebar?: boolean
  withoutExportBtn?: boolean
}

export const Header: FC<HeaderProps> = ({
  navItems,
  userData,
  withoutNav,
  withoutSidebar,
  withoutExportBtn,
}) => {
  const { selectedData } = useReport()
  return (
    <header className="mb-5 w-[100%] bg-white shadow">
      <div className="mx-5 flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          {!withoutSidebar && <SidebarTrigger />}
          {!withoutNav && navItems && <Navbar navItems={navItems} />}
        </div>
        <div className="flex items-center gap-5">
          {!withoutExportBtn && (
            <div className="flex gap-4">
              <div>{selectedData.name}</div>
              <div>{selectedData.date}</div>
            </div>
          )}
          {!withoutNav && <Button variant="primary">Сохранить отчёт</Button>}
          <UserNav userData={userData} />
        </div>
      </div>
    </header>
  )
}
