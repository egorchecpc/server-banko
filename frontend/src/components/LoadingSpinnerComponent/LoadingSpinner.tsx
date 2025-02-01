const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-grey-300/40">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-lg font-medium text-gray-600">Загрузка...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
