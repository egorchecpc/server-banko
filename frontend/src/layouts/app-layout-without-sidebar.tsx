import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import Footer from '@/components/FooterComponent/Footer'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'

export const AppLayoutWithoutSidebar = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <HeaderModule
        withoutNav={false}
        withoutSidebar={true}
        withBackBtn={false}
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
  )
}
