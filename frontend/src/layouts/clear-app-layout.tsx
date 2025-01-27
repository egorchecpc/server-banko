import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { SidebarProvider } from '@/components/ui/sidebar'
import { NavigationProvider } from '@/context/NavigationContext'

export const ClearAppLayout = () => {
  return (
    <NavigationProvider>
      <SidebarProvider>
        <div className="flex w-[1920px] flex-col overflow-hidden">
          <HeaderModule
            withoutNav={true}
            withoutSidebar={true}
            withoutExportBtn={true}
          />
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
