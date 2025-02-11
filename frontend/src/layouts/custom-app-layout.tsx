import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { AppSidebar } from '@/modules/SidebarModule/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Footer from '@/components/FooterComponent/Footer'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'

export const CustomAppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-[1920px] flex-col overflow-hidden">
        <HeaderModule
          withoutNav={true}
          withoutSidebar={false}
          isNewReport={true}
        />
        <main className="mx-5">
          <div>
            <PageWrapper>
              <Outlet />
            </PageWrapper>
          </div>
        </main>
        <div className="mt-16"></div>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
