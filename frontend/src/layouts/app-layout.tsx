import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { AppSidebar } from '@/modules/SidebarModule/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Footer from '@/components/FooterComponent/Footer'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-[1920px] flex-col overflow-hidden">
        <HeaderModule />
        <main className="mx-5 flex-1">
          <div>
            <PageWrapper>
              <Outlet />
            </PageWrapper>
          </div>
        </main>
        <div className="mt-12"></div>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
