import { Header } from '@/components/Header/Header'
import { FC } from 'react'
import { navItems, userData } from './HeaderModuleConfig'

interface HeaderModule {
  withoutNav?: boolean
  withoutSidebar?: boolean
  withoutExportBtn?: boolean
  withLogo?: boolean
  withBackBtn?: boolean
}

export const HeaderModule: FC<HeaderModule> = ({
  withoutNav = false,
  withoutSidebar = false,
  withoutExportBtn = false,
  withLogo = false,
  withBackBtn = false,
}) => {
  return (
    <Header
      navItems={navItems}
      userData={userData}
      withoutNav={withoutNav}
      withoutSidebar={withoutSidebar}
      withoutExportBtn={withoutExportBtn}
      withLogo={withLogo}
      withBackBtn={withBackBtn}
    />
  )
}
