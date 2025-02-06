import { createFileRoute, redirect } from '@tanstack/react-router'
import { ReportsPage } from '@/pages/Reports/ReportsPage'
import { ProtectedRoute } from '@/utils/ProtectedRoute'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute('/reports')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth',
        search: {
          returnTo: '/reports',
        },
      })
    }
  },
  component: ReportsPage,
})

export default function Reports() {
  return (
    <ProtectedRoute>
      <ReportsPage />
    </ProtectedRoute>
  )
}
