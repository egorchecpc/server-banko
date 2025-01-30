import { Outlet } from '@tanstack/react-router'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { NavigationProvider } from '@/context/NavigationContext'

export const AppLayoutWithoutSidebar = () => {
  return (
    <NavigationProvider>
      <div className="flex w-[1920px] flex-col overflow-hidden">
        <HeaderModule
          withoutNav={false}
          withoutSidebar={true}
          withBackBtn={true}
        />
        <main className="mx-5">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </NavigationProvider>
  )
}
