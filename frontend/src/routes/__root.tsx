import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import ScrollToTop from '@/components/ScrollToTopComponent/ScrollToTop'
import { ReportIdProvider } from '@/context/ReportIdContext'
import { ReportProvider } from '@/context/DateContext'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ReportIdProvider>
      <ReportProvider>
        <div className="app mx-auto flex min-h-screen w-full">
          <Outlet />
          {/*<TanStackRouterDevtools position="bottom-right" />*/}
          <ScrollToTop />
          <Toaster expand={true} position="bottom-right" richColors />
        </div>
      </ReportProvider>
    </ReportIdProvider>
  )
}
