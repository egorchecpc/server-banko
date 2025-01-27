import { createFileRoute } from '@tanstack/react-router'
import { ReportsPage } from '@/pages/Reports/ReportsPage'

export const Route = createFileRoute('/reports')({
  component: Reports,
})

export default function Reports() {
  return <ReportsPage />
}
