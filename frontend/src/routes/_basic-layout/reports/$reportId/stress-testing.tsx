import { createFileRoute, redirect } from '@tanstack/react-router'
import { StressTestingPage } from '@/pages/StressTesting/StressTesting'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute(
  '/_basic-layout/reports/$reportId/stress-testing'
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
  component: StressTestingPage,
})

export default function StressTesting() {
  return <StressTestingPage reportDate={'01.01.2024'} />
}
