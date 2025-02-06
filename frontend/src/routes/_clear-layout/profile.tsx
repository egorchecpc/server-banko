import { createFileRoute, redirect } from '@tanstack/react-router'
import { ProfilePage } from '@/pages/Profile/Profile'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute('/_clear-layout/profile')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth',
        search: {
          returnTo: window.location.pathname,
        },
      })
    }
  },
  component: ProfilePage,
})

export default function Profile() {
  return <ProfilePage />
}
