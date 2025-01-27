import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '@/pages/Dashboard/Dashboard'

export const Route = createFileRoute(
  '/_basic-layout/reports/$reportId/dashboard',
)({
  component: Dashboard,
})

export default function Dashboard() {
  return <DashboardPage />
}
