import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { SidebarProvider } from '@/components/ui/sidebar'
import Footer from '@/components/FooterComponent/Footer'

export const ClearAppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-[1920px] flex-col overflow-hidden">
        <HeaderModule
          withoutNav={true}
          withoutSidebar={true}
          withoutExportBtn={true}
          withBackBtn={true}
        />
        <main className="mx-5">
          <div>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
