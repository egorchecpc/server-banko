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
import { Link, useParams, useRouter } from '@tanstack/react-router'
import { DebtorData } from '@/models/DebtorData'
import { MacroSettings } from '@/models/MacroSettings'
import { useUpdateReport } from '@/hooks/apiHooks/commonHooks/usePostReportData'
import { usePostMacroSettingsData } from '@/hooks/apiHooks/commonHooks/usePostMacroSettingsData'
import { usePostSummary } from '@/hooks/apiHooks/dashboardHooks/usePostCalculateECLSummary'
import { useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'
import { usePostPortfolio } from '@/hooks/apiHooks/dashboardHooks/usePostPortfolioECL'
import { useReportDataWithValidation } from '@/hooks/apiHooks/commonHooks/useReportData'
import { fixDate } from '@/utils/dateConverter'

export const AppSidebar: FC = () => {
  const [debtorData, setDebtorData] = useState<DebtorData | undefined>()
  const [macroData, setMacroData] = useState<MacroSettings[] | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)

  const { reportId } = useParams({ strict: false })
  const { report } = useReportDataWithValidation(reportId || '')
  const basicReportDate = new Date(report?.debtorData.date || '01.01.2024')
  const reportDate =
    basicReportDate.toISOString().split('T')[0] || 'Дата не найдена'
  const date = fixDate(reportDate)

  const router = useRouter()
  const { mutate: updateReport, isPending: isPendingReport } = useUpdateReport()
  const { mutate: postMacroSettings, isPending: isPendingMacro } =
    usePostMacroSettingsData()
  const { mutate: postSummary, isPending: isPendingSummary } =
    usePostSummary(date)
  const { mutate: postPortfolio, isPending: isPendingPortfolio } =
    usePostPortfolio(date)
  const queryClient = useQueryClient()

  const isLoading =
    isPendingReport || isPendingMacro || isPendingSummary || isPendingPortfolio
  const handlePostSettings = async () => {
    if (!reportId) {
      console.error('reportId is missing')
      return
    }

    try {
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
            onSuccess: () => {
              resolve()
            },
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
      await queryClient.invalidateQueries({ queryKey: ['ProfileReportsData'] })
      await queryClient.invalidateQueries({ queryKey: ['ECLDataV1', date] })
      await queryClient.invalidateQueries({ queryKey: ['ECLDataV2', date] })
      await router.navigate({ to: `/reports/${reportId}/dashboard` })
    } catch (error) {
      console.error('Ошибка при отправке данных:', error)
    }
  }

  const postSettings = () => {
    return function () {
      handlePostSettings().then((r) => console.log(r))
    }
  }

  const years = getYearArray(true, true, 4)

  return (
    <Sidebar className="h-full">
      <SidebarHeader />
      <SidebarContent>
        <ScrollArea className="flex-1">
          {isLoading ? <LoadingSpinner /> : ''}
          <div className="flex h-full flex-col items-center">
            <Link to="/apps">
              <img src="/img/logo.svg" alt="BANKO" className="w-48 py-2 pt-4" />
            </Link>

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
