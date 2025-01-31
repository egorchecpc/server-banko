import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { AppSidebar } from '@/modules/SidebarModule/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { NavigationProvider } from '@/context/NavigationContext'
import Footer from '@/components/FooterComponent/Footer'

export const AppLayout = () => {
  return (
    <NavigationProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex min-h-screen w-[1920px] flex-col overflow-hidden">
          <HeaderModule />
          <main className="mx-5 flex-1">
            <div>
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </NavigationProvider>
  )
}
