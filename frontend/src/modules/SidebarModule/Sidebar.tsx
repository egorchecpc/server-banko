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
import { usePostMacroSettingsData } from '@/hooks/apiHooks/commonHooks/usePostMacroSettingsData'

export const AppSidebar: FC = () => {
  const [debtorData, setDebtorData] = useState<DebtorData | undefined>()
  const [macroData, setMacroData] = useState<MacroSettings[] | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const { enableNavigation } = useNavigation()

  const { reportId } = useParams({ strict: false })
  const router = useRouter()

  const { mutate: updateReport } = useUpdateReport()
  const { mutate: postMacroSettings } = usePostMacroSettingsData()
  const handlePostSettings = async () => {
    if (!reportId) {
      console.error('reportId is missing')
      return
    }

    try {
      // Выполняем обе мутации параллельно
      await Promise.all([
        // Обновление отчета
        new Promise<void>((resolve, reject) => {
          if (!debtorData) {
            reject('Debtor data is missing')
            return
          }

          updateReport(
            {
              id: reportId,
              debtorData,
              macroData: formatMacroDataToServer(macroData),
            },
            {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            }
          )
        }),

        // Отправка макро-настроек
        new Promise<void>((resolve, reject) => {
          if (!macroData) {
            reject('Macro data is missing')
            return
          }

          postMacroSettings(formatMacroDataToServer(macroData), {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          })
        }),
      ])

      // Общая обработка успеха
      console.log('Все данные успешно отправлены')
      enableNavigation()
      router.navigate({ to: `/reports/${reportId}/dashboard` })
    } catch (error) {
      console.error('Ошибка при отправке данных:', error)
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
              ЛОГО
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
