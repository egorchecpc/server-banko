import { createFileRoute, redirect } from '@tanstack/react-router'
import { ReportsPage } from '@/pages/Reports/ReportsPage'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute('/_main-layout/reports/')({
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
  component: ReportsPage,
})

export default function Index() {
  return <ReportsPage />
}
