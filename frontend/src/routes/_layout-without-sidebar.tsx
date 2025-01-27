import { createFileRoute } from '@tanstack/react-router'
import { AppLayoutWithoutSidebar } from '@/layouts/app-layout-without-sidebar'

export const Route = createFileRoute('/_layout-without-sidebar')({
  component: LayOutWithoutSidebar,
})

export default function LayOutWithoutSidebar() {
  return <AppLayoutWithoutSidebar />
}
