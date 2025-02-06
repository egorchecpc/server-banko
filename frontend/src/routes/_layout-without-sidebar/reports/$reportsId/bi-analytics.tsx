import { createFileRoute, redirect } from '@tanstack/react-router'
import { BIAnalyticsPage } from '@/pages/BIAnalytics/BIAnalytics'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute(
  '/_layout-without-sidebar/reports/$reportsId/bi-analytics'
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
  component: BIAnalyticsPage,
})

export default function BiAnalytics() {
  return <BIAnalyticsPage />
}
