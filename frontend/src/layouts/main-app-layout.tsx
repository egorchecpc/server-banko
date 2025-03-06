import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import Footer from '@/components/FooterComponent/Footer'

export const MainAppLayout = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-grey-300/40">
      <HeaderModule
        withoutNav={true}
        withoutSidebar={true}
        withoutExportBtn={true}
        withLogo={true}
      />
      <div className="flex-1">
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
