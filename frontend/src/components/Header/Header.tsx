import { FC } from 'react'
import { Navbar } from '@/components/Navbar/Navbar'
import UserNav from '@/components/UserNav/UserNav'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ExportComponent } from '@/modules/ExportModule/ExportModule'

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
  return (
    <header className="mb-5 w-[100%] bg-white shadow">
      <div className="mx-5 flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          {!withoutSidebar && <SidebarTrigger />}
          {!withoutNav && navItems && <Navbar navItems={navItems} />}
        </div>
        <div className="flex gap-5">
          {!withoutExportBtn && <ExportComponent />}
          <UserNav userData={userData} />
        </div>
      </div>
    </header>
  )
}
