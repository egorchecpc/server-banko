import { createFileRoute } from '@tanstack/react-router'
import { BIAnalyticsPage } from '@/pages/BIAnalytics/BIAnalytics'

export const Route = createFileRoute(
  '/_layout-without-sidebar/reports/$reportsId/bi-analytics',
)({
  component: BiAnalytics,
})

export default function BiAnalytics() {
  return <BIAnalyticsPage />
}
