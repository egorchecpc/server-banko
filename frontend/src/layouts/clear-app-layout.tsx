import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { SidebarProvider } from '@/components/ui/sidebar'
import Footer from '@/components/FooterComponent/Footer'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'

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
