import {
  columns,
  labels,
  owners,
  priorities,
  statuses,
  titles,
} from './ReportsConfig'
import { ProfileReportData } from '@/models/ProfileReport'
import { FC, useState } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useNavigate } from '@tanstack/react-router'
import { ReportDetails } from '@/modules/ReportsModule/ReportDetails'
import { useReport } from '@/context/DateContext'
import { DataTable } from '@/components/CustomTableComponents/DataTable'

interface ProfileReportsProps {
  data: ProfileReportData[]
}
export const ReportsModule: FC<ProfileReportsProps> = ({ data }) => {
  const navigate = useNavigate()
  const { setSelectedData } = useReport()
  const [selectedReport, setSelectedReport] =
    useState<ProfileReportData | null>(data[0])

  const handeRowClick = (reportId: string) => {
    const foundReport = data.find((report) => report.id === reportId)
    if (foundReport) {
      setSelectedReport(foundReport)
    }
  }
  const handleRowDoubleClick = (reportId: string) => {
    const foundReport = data.find((report) => report.id === reportId)
    if (foundReport) {
      setSelectedData({ date: foundReport.date, name: foundReport.title })
    }
    navigate({
      to: `/reports/${reportId}/dashboard`,
    }).then((r) => console.log(r))
    // navigate({
    //   to: `/reports/${reportId}/credit-type`,
    //   search: { id: reportId },
    // }).then((r) => console.log(r))
  }

  return (
    <TooltipProvider>
      <div className="mx-auto flex w-full flex-col space-y-4">
        <DataTable
          columns={columns}
          data={data}
          titles={titles}
          filters={[
            { title: 'Статус', column: 'status', options: statuses },
            { title: 'Приоритет', column: 'priority', options: priorities },
            { title: 'Владелец', column: 'owner', options: owners },
            { title: 'Лейбл', column: 'label', options: labels },
          ]}
          searchPlaceholder="Поиск по названию отчёта"
          searchColumn="title"
          withContainer={false}
          withCustomStyle={true}
          onRowDoubleClick={handleRowDoubleClick}
          onRowClick={handeRowClick}
          initialSelectedId={data[0]?.id}
        />
        {selectedReport && (
          <ReportDetails
            report={selectedReport}
            onBtnClick={handleRowDoubleClick}
          />
        )}
      </div>
    </TooltipProvider>
  )
}
