import loaderGif from './loader.gif'

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/*<div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />*/}
        <img src={loaderGif} alt="Loading..." className="h-14 w-14" />
        <p className="text-[14px] font-medium text-gray-600">Загрузка...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
