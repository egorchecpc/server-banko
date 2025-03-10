import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import Footer from '@/components/FooterComponent/Footer'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { useLoading } from '@/context/LoadingContext'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'

export const AppLayoutWithoutSidebar = () => {
  const { isLoading } = useLoading()

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
      {!isLoading && <Footer />}
      {isLoading && <LoadingSpinner />}
    </div>
  )
}
