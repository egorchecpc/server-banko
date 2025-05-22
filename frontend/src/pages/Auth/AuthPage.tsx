import React, { useState, useEffect } from 'react'
import { CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'

const AuthPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [capsLockActive, setCapsLockActive] = useState(false)

  // Обработчик для определения состояния Caps Lock
  const handleCapsLock = (e) => {
    setCapsLockActive(e.getModifierState('CapsLock'))
  }

  // Добавляем слушатели событий при монтировании компонента
  useEffect(() => {
    window.addEventListener('keydown', handleCapsLock)
    window.addEventListener('keyup', handleCapsLock)

    // Удаляем слушатели при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleCapsLock)
      window.removeEventListener('keyup', handleCapsLock)
    }
  }, [])

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
    <div className="flex h-[125vh] w-full items-center justify-center bg-grey-300/40 p-4 text-black-1000">
      <img
        src="/img/logo.png"
        alt="BANKO"
        className="absolute left-10 top-5 w-[20rem]"
      />
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <img src="/img/logo-icon.svg" alt="BANKO" className="h-14 w-14" />
        </div>

        <div className="h-96 border-none p-2 shadow-none">
          <CardHeader className="space-y-1">
            <div className="mb-1 text-center text-2xl font-bold">
              Вход в систему
            </div>
            <CardDescription className="text-center">
              Мы приветствуем вас в BANKO!
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
                <Label htmlFor="email" className="text-black-1000">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 text-black-1000"
                />
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-black-1000">
                    Пароль
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleCapsLock}
                    onKeyUp={handleCapsLock}
                    onFocus={handleCapsLock}
                    required
                    className="h-10 pr-10 text-black-1000"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {capsLockActive && (
                  <div className="mt-1 text-sm text-amber-600">
                    Внимание: включен Caps Lock
                  </div>
                )}
              </div>

              {/*<div className="flex items-center justify-between space-x-2 pt-4">*/}
              {/*  <div className="flex items-center gap-2">*/}
              {/*    <Checkbox*/}
              {/*      id="remember"*/}
              {/*      checked={rememberMe}*/}
              {/*      onCheckedChange={(checked) => {*/}
              {/*        if (typeof checked === 'boolean') setRememberMe(checked)*/}
              {/*      }}*/}
              {/*    />*/}

              {/*    <label*/}
              {/*      htmlFor="remember"*/}
              {/*      className="text-sm font-medium leading-none text-black-1000 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
              {/*    >*/}
              {/*      Запомнить меня*/}
              {/*    </label>*/}
              {/*  </div>*/}
              {/*  <Link*/}
              {/*    to="/auth"*/}
              {/*    className="text-sm text-blue-1000 hover:text-blue-1000/40"*/}
              {/*  >*/}
              {/*    Забыли пароль?*/}
              {/*  </Link>*/}
              {/*</div>*/}
              <div className="pt-4"></div>
              <Button type="submit" variant="primary" className="h-10 w-full">
                Войти
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
