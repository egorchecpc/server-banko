import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { NavigationProvider } from '@/context/NavigationContext'
import { AppSidebar } from '@/modules/SidebarModule/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Footer from '@/components/FooterComponent/Footer'

export const CustomAppLayout = () => {
  return (
    <NavigationProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex w-[1920px] flex-col overflow-hidden">
          <HeaderModule withoutNav={true} withoutSidebar={false} />
          <main className="mx-5">
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
