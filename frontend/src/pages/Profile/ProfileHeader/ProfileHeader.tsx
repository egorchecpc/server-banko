import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { ProfileData } from '@/models/Profile'
import React from 'react'

interface ProfileHeaderProps {
  userData: ProfileData
  onEdit: () => void
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userData,
  onEdit,
}) => (
  <div className="flex items-start gap-6">
    <Avatar className="h-32 w-32">
      <AvatarImage src={userData.avatar} alt={userData.name} />
      <AvatarFallback>{userData.name.slice(0, 2)}</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <p className="text-gray-600">{userData.position}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onEdit} className="pb-5">
          <Edit className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Email</p>
        <p>{userData.email}</p>
      </div>
    </div>
  </div>
)
