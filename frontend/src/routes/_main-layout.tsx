import { createFileRoute } from '@tanstack/react-router'
import { MainAppLayout } from '@/layouts/main-app-layout'

export const Route = createFileRoute('/_main-layout')({
  component: MainLayout,
})

export default function MainLayout() {
  return <MainAppLayout />
}
