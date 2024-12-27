import { FC } from 'react'
import { Navbar } from '@/components/Navbar/Navbar'
import { ImportComponent } from '@/components/ImportComponent/ImportComponent'
import UserNav from '@/components/UserNav/UserNav'
import { SidebarTrigger } from '@/components/ui/sidebar'

export interface HeaderProps {
  navItems: { [key: string]: string }
  userData: { [key: string]: string }
  isEnabled: boolean
}

export const Header: FC<HeaderProps> = ({ navItems, userData, isEnabled }) => {
  return (
    <header className="mb-5 w-[100%] bg-white shadow">
      <div className="mx-5 flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Navbar navItems={navItems} isEnabled={isEnabled} />
        </div>
        <div className="flex gap-5">
          <ImportComponent />
          <UserNav userData={userData} />
        </div>
      </div>
    </header>
  )
}
