import React from 'react'
import { Button } from '@/components/ui/button'

interface ProfileNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const ProfileNavigation: React.FC<ProfileNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className="mt-9 space-y-2">
      <Button
        variant={activeTab === 'about' ? 'primary' : 'ghost'}
        className="w-full justify-start"
        onClick={() => onTabChange('about')}
      >
        Профиль
      </Button>
      <Button
        variant={activeTab === 'templates' ? 'primary' : 'ghost'}
        className="w-full justify-start"
        onClick={() => onTabChange('templates')}
      >
        Шаблоны макроданных
      </Button>
      {/*<Button*/}
      {/*  variant={activeTab === 'r-models' ? 'primary' : 'ghost'}*/}
      {/*  className="w-full justify-start"*/}
      {/*  onClick={() => onTabChange('r-models')}*/}
      {/*>*/}
      {/*  Настройки R*/}
      {/*</Button>*/}
    </nav>
  )
}
