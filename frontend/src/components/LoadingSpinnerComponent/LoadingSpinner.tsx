import loaderGif from './loader.gif'
import { useEffect } from 'react'

const LoadingSpinner = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
      <div className="flex flex-col items-center gap-4">
        <img src={loaderGif} alt="Loading..." className="h-14 w-14" />
        <p className="text-[14px] font-medium text-gray-600">Загрузка...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
