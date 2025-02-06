import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'

export const AuthPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://banko-backend.stacklevel.group/api/login', {
        email,
        password,
      })

      // Сохраняем токен в localStorage
      localStorage.setItem('token', response.data.token)
      navigate({ to: '/reports' })
    } catch (err) {
      setError('Неверный email или пароль')
    }
  }

  return (
    <div className="bg-grey-200 overflow-hidden lg:grid lg:min-h-[37rem] lg:grid-cols-2 xl:min-h-[37rem]">
      <div className="flex items-center justify-center py-12">
        <form
          onSubmit={handleLogin}
          className="mx-auto grid w-[21.875rem] gap-6"
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Вход</h1>
            <p className="text-muted-foreground text-balance">
              Введите email для входа в аккаунт
            </p>
          </div>
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mail@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link
                to="/auth"
                className="ml-auto inline-block text-sm underline"
              >
                Забыли пароль?
              </Link>
            </div>
            <Button variant="primary" type="submit" className="w-full">
              Войти
            </Button>
          </div>
        </form>
      </div>
      <div className="bg-muted hidden max-h-screen overflow-hidden lg:block">
        <img
          src="/img/img.jpg"
          alt="Изображение"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
