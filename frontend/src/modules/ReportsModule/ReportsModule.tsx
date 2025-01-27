import { DataTable } from '@/components/CustomTableComponents/DataTable'
import { columns, owners, priorities, statuses, titles } from './ReportsConfig'
import { ProfileReportData } from '@/models/ProfileReport'
import { FC } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useNavigate } from '@tanstack/react-router'

interface ProfileReportsProps {
  data: ProfileReportData[]
}
export const ReportsModule: FC<ProfileReportsProps> = ({ data }) => {
  const navigate = useNavigate()

  const handleRowClick = (reportId: string) => {
    navigate({ to: `/reports/${reportId}/dashboard` }).then((r) =>
      console.log(r)
    )
  }

  return (
    <TooltipProvider>
      <DataTable
        columns={columns}
        data={data}
        titles={titles}
        filters={[
          { title: 'Статус', column: 'status', options: statuses },
          { title: 'Приоритет', column: 'priority', options: priorities },
          { title: 'Владелец', column: 'owner', options: owners },
        ]}
        searchPlaceholder="Поиск по названию отчёта"
        searchColumn="title"
        withContainer={false}
        withCustomStyle={true}
        onRowClick={handleRowClick}
      />
    </TooltipProvider>
  )
}
