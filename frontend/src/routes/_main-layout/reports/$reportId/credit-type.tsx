import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '@/utils/auth'
import { CreditTypePage } from '@/pages/CreditType/CreditTypePage'

export const Route = createFileRoute(
  '/_main-layout/reports/$reportId/credit-type'
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
  component: CreditType,
})

export default function CreditType() {
  return <CreditTypePage />
}
