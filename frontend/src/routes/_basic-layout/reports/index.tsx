import { createFileRoute, redirect } from '@tanstack/react-router'
import { ReportsPage } from '@/pages/Reports/ReportsPage'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute('/_basic-layout/reports/')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth',
        search: {
          returnTo: '/reports',
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
  component: ReportsPage,
})

export default function Index() {
  return <ReportsPage />
}
