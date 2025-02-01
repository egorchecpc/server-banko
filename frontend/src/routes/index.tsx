import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: BasePage,
})

export default function BasePage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/auth', replace: true })
  }, [navigate])
  return (
    <div>
      <LoaderCircle />
    </div>
  )
}
