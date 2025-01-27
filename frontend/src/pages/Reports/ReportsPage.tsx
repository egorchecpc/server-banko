import { useGetReportsData } from '@/hooks/apiHooks/commonHooks/useGetReportsData'
import { Button } from '@/components/ui/button'
import { ReportsModule } from '@/modules/ReportsModule/ReportsModule'
import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { NavigationProvider } from '@/context/NavigationContext'
import { useState } from 'react'
import ImportModalModule from '@/modules/ImportModalModule/ImportModalModule'

export const ReportsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    data: ProfileReportsData,
    isLoading: profileReportsLoading,
    isError: profileReportsError,
  } = useGetReportsData()

  const isLoading = profileReportsLoading
  const isError = profileReportsError

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error occurred while fetching data</div>
  }

  return (
    <NavigationProvider>
      <div className="flex w-full flex-col">
        <HeaderModule
          withoutNav={true}
          withoutSidebar={true}
          withoutExportBtn={true}
        />
        <div className="flex flex-1 justify-center px-40 py-5">
          <div className="layout-content-container flex max-w-[960px] flex-1 flex-col">
            <div className="mb-4 flex flex-wrap justify-between gap-3 p-0">
              <div className="min-w-72 text-4xl font-black leading-tight tracking-[-0.033em] text-[#0e141b]">
                Доступные отчёты
              </div>
              <div className="flex items-center justify-center">
                <Button
                  variant={'primary'}
                  onClick={() => setIsModalOpen(true)}
                >
                  Новый отчёт
                </Button>
              </div>
            </div>
            {ProfileReportsData && <ReportsModule data={ProfileReportsData} />}
          </div>
        </div>
      </div>
      <ImportModalModule open={isModalOpen} onOpenChange={setIsModalOpen} />
    </NavigationProvider>
  )
}
