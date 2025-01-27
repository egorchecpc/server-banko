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
    <nav className="mt-16 space-y-2">
      <Button
        variant={activeTab === 'about' ? 'secondary' : 'ghost'}
        className="w-full justify-start"
        onClick={() => onTabChange('about')}
      >
        О вас
      </Button>
      <Button
        variant={activeTab === 'templates' ? 'secondary' : 'ghost'}
        className="w-full justify-start"
        onClick={() => onTabChange('templates')}
      >
        Шаблоны макроданных
      </Button>
    </nav>
  )
}
