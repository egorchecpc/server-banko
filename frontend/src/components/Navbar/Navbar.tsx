import { Link, useRouter } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FC } from 'react'

export interface NavbarProps {
  navItems: { [key: string]: string }
  isEnabled: boolean
}

export const Navbar: FC<NavbarProps> = ({ navItems, isEnabled }) => {
  const router = useRouter()
  const currentPath = router.state.location.pathname.slice(1)

  return (
    <nav className={`w-[34rem] transition-all duration-300 ease-in-out`}>
      <Tabs defaultValue={currentPath || ''} className="w-full">
        <TabsList className="flex-start w-full">
          {Object.entries(navItems).map(([key, value]) => (
            <Link
              onClick={(e) => {
                if (!isEnabled) {
                  e.preventDefault()
                }
              }}
              to={`/${key}`}
              key={key}
              className="w-full"
            >
              <TabsTrigger
                value={key}
                disabled={!isEnabled}
                className={` ${
                  !isEnabled
                    ? `disabled-tab hover:bg-transparent hover:text-gray-400 data-[state=active]:bg-transparent data-[state=active]:text-gray-400 data-[state=active]:shadow-none`
                    : ''
                } `}
              >
                {value}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  )
}
