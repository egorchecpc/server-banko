import { createFileRoute } from '@tanstack/react-router'
import NotFoundPageComponent from '@/pages/NotFountPage/NotFoundPageComponent'

export const Route = createFileRoute('/404')({
  component: NotFoundPage,
})

export default function NotFoundPage() {
  return <NotFoundPageComponent />
}
