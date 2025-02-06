import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardPage } from '@/pages/Dashboard/Dashboard'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute(
  '/_basic-layout/reports/$reportId/dashboard'
)({
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
  component: DashboardPage,
})

export default function Dashboard() {
  return <DashboardPage />
}
