import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, useLocation } from '@tanstack/react-router'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface UserNavProps {
  userData: { [key: string]: string }
}

const UserNav: FC<UserNavProps> = ({ userData }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const reportId = location.pathname.match(/\/reports\/(.+)/)?.[1]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={userData.img} alt="user photo" />
            <AvatarFallback>
              {userData.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {userData.position}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link
            to="/profile"
            search={reportId ? { returnToReport: reportId } : undefined}
          >
            <DropdownMenuItem>{t('navbar.profile')}</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t('navbar.logOut')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
