import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '@/utils/auth'
import FinancialDashboard from '@/pages/Analytics/AnalyticsPage'

export const Route = createFileRoute('/_basic-layout/analyzer')({
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
  loader: () => ({
    headerProps: {
      withoutNav: true,
      withoutSidebar: true,
      withoutExportBtn: true,
      withLogo: true,
    },
  }),
  component: Analytics,
})

export default function Analytics() {
  return <FinancialDashboard />
}
