import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { AppSidebar } from '@/modules/SidebarModule/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { NavigationProvider } from '@/context/NavigationContext'

export const AppLayout = () => {
  return (
    <NavigationProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex w-[1920px] flex-col overflow-hidden">
          <HeaderModule />
          <main className="mx-5">
            <div>
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </NavigationProvider>
  )
}
