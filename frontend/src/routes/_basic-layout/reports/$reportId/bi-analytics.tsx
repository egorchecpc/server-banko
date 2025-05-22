import { createFileRoute, redirect } from '@tanstack/react-router'
import { BIAnalyticsPage } from '@/pages/BIAnalytics/BIAnalytics'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute(
  '/_basic-layout/reports/$reportId/bi-analytics'
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
  loader: () => ({
    headerProps: {
      withoutSidebar: true,
    },
  }),
  component: BIAnalyticsPage,
})

export default function BiAnalytics() {
  return <BIAnalyticsPage />
}
