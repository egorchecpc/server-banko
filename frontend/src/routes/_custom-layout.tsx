import { createFileRoute } from '@tanstack/react-router'
import { CustomAppLayout } from '@/layouts/custom-app-layout'

export const Route = createFileRoute('/_custom-layout')({
  component: CustomLayout,
})

export default function CustomLayout() {
  return <CustomAppLayout />
}
