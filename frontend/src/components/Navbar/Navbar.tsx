import { Link, useRouter } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FC } from 'react'

export interface NavbarProps {
  navItems: { [key: string]: string }
}

export const Navbar: FC<NavbarProps> = ({ navItems }) => {
  const router = useRouter()

  const currentPath = router.state.location.pathname.slice(1)

  return (
    <nav className={`w-[34rem] transition-all duration-300 ease-in-out`}>
      {/* Устанавливаем активный таб в зависимости от текущего маршрута */}
      <Tabs defaultValue={currentPath || ''} className="w-full">
        <TabsList className="flex-start w-full">
          {Object.entries(navItems).map(([key, value]) => (
            <Link to={`/${key}`} key={key} className="w-full">
              <TabsTrigger value={key}>{value}</TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  )
}
