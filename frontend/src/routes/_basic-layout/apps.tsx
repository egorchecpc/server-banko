import { createFileRoute, redirect } from '@tanstack/react-router'
import { AppsPage } from '@/pages/Apps/AppsPage'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute('/_basic-layout/apps')({
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
  loader: () => ({
    headerProps: {
      withoutNav: true,
      withoutSidebar: true,
      withoutExportBtn: true,
      withLogo: true,
    },
  }),
  component: Apps,
})

export default function Apps() {
  return <AppsPage />
}
