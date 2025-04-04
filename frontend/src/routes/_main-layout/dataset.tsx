import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '@/utils/auth'
import { DatasetPage } from '@/pages/Dataset/Dataset'

export const Route = createFileRoute('/_main-layout/dataset')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth',
        search: {
          returnTo: '/dataset',
        },
      })
    }
  },
  component: Dataset,
})

export default function Dataset() {
  return <DatasetPage />
}
