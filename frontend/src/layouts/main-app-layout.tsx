import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'

export const MainAppLayout = () => {
  return (
    <div className="flex min-h-screen w-[1920px] flex-col overflow-hidden bg-grey-300/40">
      <HeaderModule
        withoutNav={true}
        withoutSidebar={true}
        withoutExportBtn={true}
        withLogo={true}
      />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
