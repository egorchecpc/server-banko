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
import { usePostSummary } from '@/hooks/apiHooks/dashboardHooks/usePostCalculateECLSummary'
import { useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'
import { usePostPortfolio } from '@/hooks/apiHooks/dashboardHooks/usePostPortfolioECL'

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
  const { mutate: postSummary, isPending } = usePostSummary()
  const { mutate: postPortfolio, isPending: isPendingPortfolio } =
    usePostPortfolio()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const handlePostSettings = async () => {
    if (!reportId) {
      console.error('reportId is missing')
      return
    }

    setIsLoading(true)

    try {
      await Promise.all([
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

      await new Promise<void>((resolve, reject) => {
        postSummary(undefined, {
          onSuccess: () => {
            console.log('Summary successfully posted')
            resolve()
          },
          onError: (error) => reject(error),
        })
      })

      await new Promise<void>((resolve, reject) => {
        postPortfolio(undefined, {
          onSuccess: () => {
            console.log('Portfolio successfully posted')
            resolve()
          },
          onError: (error) => reject(error),
        })
      })

      console.log('Все данные успешно отправлены')

      // 🔄 Перезапрашиваем данные дашборда
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] })

      enableNavigation()
      router.navigate({ to: `/reports/${reportId}/dashboard` })
    } catch (error) {
      console.error('Ошибка при отправке данных:', error)
    } finally {
      setIsLoading(false)
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
            {(isPending || isPendingPortfolio) && <LoadingSpinner />}
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
