import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'

const AuthPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading((prev) => !prev)
      const response = await axios.post(
        'https://banko-backend.stacklevel.group/api/login',
        {
          email,
          password,
        }
      )
      setIsLoading((prev) => !prev)
      localStorage.setItem('token', response.data.token)
      navigate({ to: '/apps' })
    } catch (err) {
      setIsLoading((prev) => !prev)
      setError('Пользователь не найден')
      console.log(err)
    }
  }
  if (isLoading) return <LoadingSpinner />
  return (
    <div className="flex h-[125vh] w-full items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-400 to-blue-300 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
            <img src="/img/logo.png" alt="BANKO" className="h-36" />
        </div>

        <Card className="border-none p-2 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="mb-1 text-center text-2xl font-bold">
              Вход в систему
            </div>
            <CardDescription className="text-center">
              Введите email для входа в аккаунт
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') setRememberMe(checked)
                    }}
                  />

                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Запомнить меня
                  </label>
                </div>
                <Link
                  to="/auth"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Забыли пароль?
                </Link>
              </div>

              <Button type="submit" variant="primary" className="h-10 w-full">
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuthPage
