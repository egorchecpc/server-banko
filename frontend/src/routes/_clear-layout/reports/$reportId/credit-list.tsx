import { createFileRoute, redirect } from '@tanstack/react-router'
import { CreditListPage } from '@/pages/CreditList/CreditList'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute(
  '/_clear-layout/reports/$reportId/credit-list'
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
  component: CreditListPage,
})

export default function CreditList() {
  return <CreditListPage />
}
