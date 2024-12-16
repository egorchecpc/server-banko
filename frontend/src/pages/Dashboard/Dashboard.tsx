import { Button } from '@/components/ui/button'
import { Download as DownloadIcon } from 'lucide-react'
import PDDisplayModule from '@/modules/PDDisplayModule/PDDisplayModule'
import LGDTable from '@/components/Tables/LGDTable/LGDTable'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useGetDashboardData } from '@/hooks/useGetDashboardData'
import ECLDisplayModule from '@/modules/ECLDisplayModule/ECLDisplayModule'
import PCureDisplayModule from '@/modules/PCureDisplayModule/PCureDisplayModule'

export const DashboardPage = () => {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useGetDashboardData()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error occurred while fetching data</div>
  }
  return (
    <div className="mb-6 max-w-full">
      <div className="flex items-center justify-between">
        <div className="mb-5 text-2xl font-bold leading-38 text-black-900">
          {t('dashboard.title')}
        </div>
        <Button variant="export" size="default">
          <div className="flex items-center gap-1">
            <DownloadIcon className="h-4 w-4" />
            <div>{t('dashboard.buttons.exportBtn')}</div>
          </div>
        </Button>
      </div>
      {data.yearlyPDData && data.quarterlyPDData && (
        <div className="mb-3">
          <PDDisplayModule
            yearlyPDData={data.yearlyPDData}
            quarterlyPDData={data.quarterlyPDData}
          />
        </div>
      )}
      <div className="mb-3 grid grid-cols-4 gap-4">
        {data.LGDData && (
          <div className="col-span-3">
            <LGDTable data={data.LGDData} />
          </div>
        )}
        <div className="col-span-1">
          <PCureDisplayModule />
        </div>
      </div>
      <div className="w-full rounded-lg border bg-grey-300/40 p-1.5">
        <div className="my-2 ml-4 flex items-center justify-between">
          <div className="text-xl font-bold leading-24 text-black-800">
            {t('dashboard.tables.eclTable.title')}
          </div>
          <Button variant="export" size="default">
            <Link to="/credit-list">{t('dashboard.creditListBtn')}</Link>
          </Button>
        </div>
        {data.eclDataV1 && data.eclDataV2 && (
          <ECLDisplayModule
            eclDataV1={data.eclDataV1}
            eclDataV2={data.eclDataV2}
          />
        )}
      </div>
    </div>
  )
}
