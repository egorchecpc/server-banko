import { Header } from '@/components/Header/Header'
import { FC } from 'react'
import { navItems, userData } from './index'

export const HeaderModule: FC = () => {
  return <Header navItems={navItems} userData={userData} />
}
