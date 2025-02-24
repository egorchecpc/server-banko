import { createFileRoute, redirect } from '@tanstack/react-router'
import { AppsPage } from '@/pages/Apps/AppsPage'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute('/_main-layout/apps')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth',
        search: {
          returnTo: '/apps',
        },
      })
    }
  },
  component: Apps,
})

export default function Apps() {
  return <AppsPage />
}
