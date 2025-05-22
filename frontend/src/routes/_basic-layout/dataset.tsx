import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '@/utils/auth'
import { DatasetPage } from '@/pages/Dataset/Dataset'

export const Route = createFileRoute('/_basic-layout/dataset')({
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
  loader: () => ({
    headerProps: {
      withoutNav: true,
      withoutSidebar: true,
      withoutExportBtn: true,
      withLogo: true,
    },
  }),
  component: Dataset,
})

export default function Dataset() {
  return <DatasetPage />
}
