import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Upload } from 'lucide-react'
import { ProfileData } from '@/models/Profile'

interface ProfileEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editedProfile: ProfileData
  onProfileChange: (profile: ProfileData) => void
  onSave: () => void
}

export const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({
  open,
  onOpenChange,
  editedProfile,
  onProfileChange,
  onSave,
}) => {
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onProfileChange({
          ...editedProfile,
          avatar: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать профиль</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/*<div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={editedProfile.avatar} />
              <AvatarFallback>{editedProfile.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <Label htmlFor="avatar" className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Upload className="h-4 w-4" />
                  Загрузить фото
                </div>
              </Label>
              <input
                id="avatar"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </div>*/}
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              value={editedProfile.name}
              onChange={(e) =>
                onProfileChange({
                  ...editedProfile,
                  name: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={onSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
