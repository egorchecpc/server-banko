import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '@/utils/auth'

export const Route = createFileRoute('/_basic-layout/reports/$reportId/')({
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
  component: HomeComponent,
})

export default function HomeComponent() {
  return (
    <div>
      <div className="mt-[10rem] flex items-center justify-center">
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
