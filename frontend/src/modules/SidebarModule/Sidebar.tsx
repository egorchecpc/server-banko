import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { DebtorForm } from '@/modules/SidebarModule/DebtorForm/DebtorForm'
import { MacroSettingsComponent } from '@/modules/SidebarModule/MacroSettings/MacroSettings'
import { FC, useState } from 'react'
import { getYearArray } from '@/utils/getDate'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatMacroDataToServer } from '@/utils/formatMacroDataToServer'
import { useParams, useRouter } from '@tanstack/react-router'
import { useNavigation } from '@/context/NavigationContext'
import { DebtorData } from '@/models/DebtorData'
import { MacroSettings } from '@/models/MacroSettings'
import { useUpdateReport } from '@/hooks/apiHooks/commonHooks/usePostReportData'

export const AppSidebar: FC = () => {
  const [debtorData, setDebtorData] = useState<DebtorData | undefined>()
  const [macroData, setMacroData] = useState<MacroSettings[] | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const { enableNavigation } = useNavigation()

  const { reportId } = useParams({ strict: false })
  const router = useRouter()

  const { mutate } = useUpdateReport()
  const handlePostSettings = () => {
    if (!reportId) {
      console.error('reportId is missing')
      return
    }
    const formattedMacroData = formatMacroDataToServer(macroData)
    if (debtorData) {
      mutate(
        { id: reportId, debtorData, macroData: formattedMacroData },
        {
          onSuccess: () => {
            console.log('Данные успешно отправлены')
            enableNavigation()
            router
              .navigate({ to: `/reports/${reportId}/dashboard` })
              .then((r) => console.log(r))
          },
          onError: (error) => {
            console.error('Ошибка:', error.message)
          },
        }
      )
    }
  }

  const postSettings = () => {
    return function () {
      handlePostSettings()
    }
  }
  const years = getYearArray(true, true, 4)

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <ScrollArea className="flex-1">
          <div className="flex h-full flex-col items-center">
            <h2 className="pb-6 pt-2 text-2xl font-extrabold leading-9 text-blue-900">
              ЛОГОРИФМ
            </h2>

            <div className="w-full overflow-y-auto overflow-x-hidden p-5">
              <div className="rounded-lg bg-white p-4">
                <DebtorForm setDebtorData={setDebtorData} />
              </div>
              <MacroSettingsComponent
                postSettings={postSettings()}
                setMacroData={setMacroData}
                years={years}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                isTemplateModalOpen={isTemplateModalOpen}
                setIsTemplateModalOpen={setIsTemplateModalOpen}
              />
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
