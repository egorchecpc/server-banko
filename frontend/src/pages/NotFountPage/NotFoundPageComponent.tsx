import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-[125vh] min-h-screen w-full flex-1 items-center justify-center bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-50 blur-xl"></div>
          <h1 className="relative text-9xl font-bold text-white">404</h1>
        </div>

        <h2 className="text-3xl font-semibold text-white">
          Страница не найдена
        </h2>

        <p className="text-blue-100">
          Извините, но страница, которую вы ищете, не существует или была
          перемещена.
        </p>

        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
          <Button
            variant="outline"
            className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться назад
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => navigate({ to: '/' })}
          >
            <Home className="mr-2 h-4 w-4" />
            На главную
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
