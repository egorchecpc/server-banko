import { createFileRoute, redirect } from '@tanstack/react-router'
import { StressTestingPage } from '@/pages/StressTesting/StressTesting'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute(
  '/_layout-without-sidebar/reports/$reportsId/stress-testing'
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
  component: StressTestingPage,
})

export default function StressTesting() {
  return <StressTestingPage reportDate={'01.01.2024'} />
}
