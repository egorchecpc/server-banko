import { createFileRoute, redirect } from '@tanstack/react-router'
import { CreditListPage } from '@/pages/CreditList/CreditList'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute(
  '/_basic-layout/reports/$reportId/credit-list'
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
      withoutNav: true,
      withoutSidebar: true,
      withoutExportBtn: true,
      withBackBtn: true,
    },
  }),
  component: CreditListPage,
})

export default function CreditList() {
  return <CreditListPage />
}
