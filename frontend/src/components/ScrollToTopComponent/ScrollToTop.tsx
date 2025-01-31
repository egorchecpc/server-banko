import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          variant="outline"
          className="fixed bottom-4 right-4 rounded-full !border-0 p-2 shadow-lg transition-opacity"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}

export default ScrollToTop
