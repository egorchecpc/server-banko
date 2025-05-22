import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { AppSidebar } from '@/modules/SidebarModule/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Footer from '@/components/FooterComponent/Footer'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { ChatProvider } from '@/context/ai-context'

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <ChatProvider>
        <AppSidebar />
        <div className="flex h-full w-full flex-col overflow-hidden">
          <HeaderModule />
          <main className="mx-5 flex-1">
            <div>
              <PageWrapper>
                <Outlet />
              </PageWrapper>
            </div>
          </main>
          <div className="mt-12"></div>
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </ChatProvider>
    </SidebarProvider>
  )
}
