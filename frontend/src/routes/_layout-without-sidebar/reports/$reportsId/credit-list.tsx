import { createFileRoute } from '@tanstack/react-router'
import { CreditListPage } from '@/pages/CreditList/CreditList'

export const Route = createFileRoute(
  '/_layout-without-sidebar/reports/$reportsId/credit-list',
)({
  component: CreditList,
})

export default function CreditList() {
  return <CreditListPage />
}
