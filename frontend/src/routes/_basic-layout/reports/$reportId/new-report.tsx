import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute(
  '/_basic-layout/reports/$reportId/new-report'
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
      isNewReport: true,
    },
  }),
  component: NewReportComponent,
})

export default function NewReportComponent() {
  return (
    <div className="mt-[35vh] flex h-full w-full items-center justify-center">
      <div className="my-auto flex items-center justify-center">
        <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <div className="text-center">
            <h1 className="text-xl font-bold text-blue-900">
              Укажите макропоказатели
            </h1>
            <p className="mt-2 text-gray-600">
              и выберите типы кредитов для продолжения работы
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
