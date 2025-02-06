import { Navigate } from '@tanstack/react-router'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/auth" />
  }

  return <>{children}</>
}
