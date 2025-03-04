import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '@/utils/auth'
import FinancialDashboard from '@/pages/Analytics/AnalyticsPage'

export const Route = createFileRoute('/_main-layout/test')({
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
  component: Analytics,
})

export default function Analytics() {
  return <FinancialDashboard />
}
