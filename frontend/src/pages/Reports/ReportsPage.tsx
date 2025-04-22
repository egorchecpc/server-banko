import { useGetReportsData } from '@/hooks/apiHooks/commonHooks/useGetReportsData'
import { Button } from '@/components/ui/button'
import { ReportsModule } from '@/modules/ReportsModule/ReportsModule'
import { useState } from 'react'
import ImportModalModule from '@/modules/ImportModalModule/ImportModalModule'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'
import { useSearch } from '@tanstack/react-router'
import { ReportType } from '@/modules/ImportModalModule/ImportModalModuleConfig'

const debtorTypeHelper = {
  retail: 'розничные',
  corporate: 'корпоративные',
  interbank: 'межбанковские',
  sovereign: 'суверенные',
}

export const ReportsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: ProfileReportsData,
    isLoading: profileReportsLoading,
    isError: profileReportsError,
  } = useGetReportsData()

  const search: { type: string } = useSearch({
    strict: false,
  })

  const isLoading = profileReportsLoading
  const isError = profileReportsError

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (isError) {
    return <div>Error occurred while fetching data</div>
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex flex-1 justify-center px-40 py-5">
          <div className="layout-content-container flex max-w-[1400px] flex-1 flex-col">
            <div className="mb-4 flex flex-wrap justify-between gap-3 p-0">
              <div className="flex min-w-72 items-center gap-3 text-2xl font-bold leading-tight tracking-[-0.033em] text-black-1000">
                Доступные {debtorTypeHelper[search.type]} отчёты
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
      <ImportModalModule
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        type={(search.type as ReportType) || 'retail'}
      />
    </>
  )
}
