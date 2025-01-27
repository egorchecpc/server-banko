import { createFileRoute } from '@tanstack/react-router'
import { ClearAppLayout } from '@/layouts/clear-app-layout'

export const Route = createFileRoute('/_clear-layout')({
  component: ClearLayout,
})

export default function ClearLayout() {
  return <ClearAppLayout />
}
