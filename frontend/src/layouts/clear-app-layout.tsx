import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { SidebarProvider } from '@/components/ui/sidebar'
import Footer from '@/components/FooterComponent/Footer'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { useLoading } from '@/context/LoadingContext'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'

export const ClearAppLayout = () => {
  const { isLoading } = useLoading()

  return (
    <SidebarProvider>
      <div className="flex h-full w-full flex-col overflow-hidden">
        <HeaderModule
          withoutNav={true}
          withoutSidebar={true}
          withoutExportBtn={true}
          withBackBtn={true}
        />
        <main className="mx-5 flex-1">
          <div>
            <PageWrapper>
              <Outlet />
            </PageWrapper>
          </div>
        </main>
        <div className="mt-16"></div>
        {!isLoading && <Footer />}
        {isLoading && <LoadingSpinner />}
      </div>
    </SidebarProvider>
  )
}
