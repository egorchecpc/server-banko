import { createFileRoute } from '@tanstack/react-router'
import { StressTestingPage } from '@/pages/StressTesting/StressTesting'

export const Route = createFileRoute(
  '/_layout-without-sidebar/reports/$reportsId/stress-testing',
)({
  component: StressTesting,
})

export default function StressTesting() {
  return <StressTestingPage reportDate={'01.01.2024'} />
}
