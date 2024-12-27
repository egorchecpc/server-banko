import { Outlet } from '@tanstack/react-router'
import { useState } from 'react'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { AppSidebar } from '@/modules/SidebarModule/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export const AppLayout = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isNavEnabled, setIsNavEnabled] = useState(false)
  return (
    <SidebarProvider>
      <AppSidebar
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setIsNavEnabled={setIsNavEnabled}
      />
      <div className="flex w-[1920px] flex-col overflow-hidden">
        <HeaderModule isEnabled={isNavEnabled} />
        <main className="mx-5">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
