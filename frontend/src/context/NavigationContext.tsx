import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { toast } from 'sonner'

interface NavigationContextType {
  isNavEnabled: boolean
  enableNavigation: () => void
  checkNavigation: () => boolean
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
)

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isNavEnabled, setIsNavEnabled] = useState(false)

  useEffect(() => {
    const hasCompletedSetup = localStorage.getItem('hasCompletedSetup')
    if (hasCompletedSetup === 'true') {
      setIsNavEnabled(true)
    }
  }, [])

  const enableNavigation = () => {
    setIsNavEnabled(true)
    localStorage.setItem('hasCompletedSetup', 'true')
  }

  const checkNavigation = () => {
    if (!isNavEnabled) {
      toast.error(
        'Для доступа к навигации необходимо заполнить и отправить форму макропоказателей'
      )
      return false
    }
    return true
  }

  return (
    <NavigationContext.Provider
      value={{ isNavEnabled, enableNavigation, checkNavigation }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
