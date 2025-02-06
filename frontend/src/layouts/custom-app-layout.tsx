import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { AppSidebar } from '@/modules/SidebarModule/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Footer from '@/components/FooterComponent/Footer'

export const CustomAppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-[1920px] flex-col overflow-hidden">
        <HeaderModule withoutNav={true} withoutSidebar={false} />
        <main className="mx-5">
          <div>
            <Outlet />
          </div>
        </main>
        <div className="h-[32vh]"></div>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
