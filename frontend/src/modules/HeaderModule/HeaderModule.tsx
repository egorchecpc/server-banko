import { Header } from '@/components/Header/Header'
import { FC } from 'react'
import { navItems, userData } from './index'

interface HeaderModuleProps {
  isEnabled: boolean
}
export const HeaderModule: FC<HeaderModuleProps> = ({ isEnabled }) => {
  return (
    <Header navItems={navItems} userData={userData} isEnabled={isEnabled} />
  )
}
