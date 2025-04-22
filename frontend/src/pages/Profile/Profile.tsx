import { useState, useEffect } from 'react'
import { ReportsModule } from '@/modules/ReportsModule/ReportsModule'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useProfile } from '@/hooks/apiHooks/profileHooks/useProfile'
import { useTemplates } from '@/hooks/apiHooks/commonHooks/useTemplate'
import { ProfileData } from '@/models/Profile'
import { ProfileHeader } from '@/pages/Profile/ProfileHeader/ProfileHeader'
import { ProfileNavigation } from '@/pages/Profile/ProfileNavigation/ProfileNavigation'
import { TemplatesView } from '@/pages/Profile/TemplatesView/TemplatesView'
import { ProfileEditDialog } from '@/pages/Profile/ProfileEditDialog/ProfileEditDialog'
import { useGetReportsData } from '@/hooks/apiHooks/commonHooks/useGetReportsData'
import { RModelSettingsPage } from '@/modules/ModelSettingsModule/RModelSettingsPage'
import { useLoading } from '@/context/LoadingContext'
import { Card, CardContent } from '@/components/ui/card'

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('about')
  const { profile, isProfileLoading, updateProfile } = useProfile()
  const { templates, isTemplatesLoading, updateTemplate, deleteTemplate } =
    useTemplates()
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null)
  const { data: ProfileReportsData, isLoading } = useGetReportsData()
  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(isTemplatesLoading || isProfileLoading || isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [isLoading, isTemplatesLoading, isProfileLoading, setIsLoading])

  useEffect(() => {
    if (profile) {
      setEditedProfile(profile)
    }
  }, [profile])

  const handleProfileEdit = () => {
    if (profile) {
      setEditedProfile(profile)
      setProfileDialogOpen(true)
    }
  }

  const handleProfileSave = () => {
    if (editedProfile) {
      updateProfile(editedProfile)
      setProfileDialogOpen(false)
    }
  }

  if (!profile) {
    return <div></div>
  }

  const renderAboutTab = () => (
    <div className="space-y-8">
      <ProfileHeader userData={profile} onEdit={handleProfileEdit} />

      <Card>
        <CardContent className="mb-6 p-6">
          <div className="mb-2 text-2xl font-bold">6</div>
          <div className="text-gray-600">Созданных отчётов</div>
        </CardContent>
      </Card>

      <RModelSettingsPage />
    </div>
  )

  return (
    <div className="flex h-full min-h-screen">
      <div className="mt-[-18px] w-64 border-r bg-gray-50 p-6">
        <ProfileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="flex-1 p-8">
        <Tabs value={activeTab} className="space-y-6">
          <TabsContent value="about">{renderAboutTab()}</TabsContent>
          <TabsContent value="templates">
            <TemplatesView
              templates={templates || []}
              isLoading={isTemplatesLoading}
              onUpdateTemplate={updateTemplate}
              onDeleteTemplate={deleteTemplate}
            />
          </TabsContent>
          {/*<TabsContent value="r-models">*/}
          {/*  <RModelSettingsPage />*/}
          {/*</TabsContent>*/}
        </Tabs>
      </div>

      {editedProfile && (
        <ProfileEditDialog
          open={profileDialogOpen}
          onOpenChange={setProfileDialogOpen}
          editedProfile={editedProfile}
          onProfileChange={setEditedProfile}
          onSave={handleProfileSave}
        />
      )}
    </div>
  )
}
