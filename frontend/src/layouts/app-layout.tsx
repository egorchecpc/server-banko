import { Outlet, useMatches } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { AppSidebar } from '@/modules/SidebarModule/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Footer from '@/components/FooterComponent/Footer'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { ChatProvider } from '@/context/ai-context'
import { HeaderProps } from '@/components/Header/Header'
import { useLoading } from '@/context/LoadingContext'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'

interface LoaderDataWithHeaderProps {
  headerProps?: HeaderProps
}

export const AppLayout = () => {
  const { isLoading } = useLoading()

  const matches = useMatches()

  const matchWithHeaderProps = matches
    .slice()
    .reverse()
    .find(
      (
        match
      ): match is typeof match & { loaderData: LoaderDataWithHeaderProps } => {
        return !!(match.loaderData && 'headerProps' in match.loaderData)
      }
    )

  const headerProps: HeaderProps = {
    userData: {},
    withoutNav: false,
    withoutSidebar: false,
    withoutExportBtn: false,
    withLogo: false,
    withBackBtn: false,
    isNewReport: false,
    ...matchWithHeaderProps?.loaderData?.headerProps,
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <SidebarProvider>
        <ChatProvider>
          {!headerProps.withoutSidebar && <AppSidebar />}
          <div className="flex h-full w-full flex-col overflow-hidden">
            <HeaderModule {...headerProps} />
            <main className="mx-5 flex-1">
              <div>
                <PageWrapper>
                  <Outlet />
                </PageWrapper>
              </div>
            </main>
            <div className="mt-12"></div>
            {headerProps.isNewReport && <div className="mt-[19rem]"></div>}
            <div className="mt-auto">{!isLoading && <Footer />}</div>
          </div>
        </ChatProvider>
      </SidebarProvider>
      {isLoading && <LoadingSpinner />}
    </div>
  )
}
