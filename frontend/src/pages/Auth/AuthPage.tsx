import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const AuthPage = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-grey-200 overflow-hidden lg:grid lg:min-h-[37rem] lg:grid-cols-2 xl:min-h-[37rem]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[21.875rem] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
              <Link
                to="/auth"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Button
              variant="primary"
              type="submit"
              className="w-full"
              onClick={() => navigate({ to: `/reports` })}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-muted hidden max-h-screen overflow-hidden lg:block">
        <img
          src="/img/img.jpg"
          alt="Image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
