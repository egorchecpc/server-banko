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
import { usePostMacroSettingsData } from '@/hooks/apiHooks/sidebarHooks/usePostMacroSettingsData'
import { usePostSummary } from '@/hooks/apiHooks/sidebarHooks/usePostCalculateECLSummary'
import { useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'
import { usePostPortfolio } from '@/hooks/apiHooks/sidebarHooks/usePostPortfolioECL'
import { useReportDataWithValidation } from '@/hooks/useReportData'
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
    const totalStartTime = performance.now()
    console.log('Начало выполнения handlePostSettings')

    if (!reportId) {
      console.error('reportId is missing')
      return
    }

    try {
      // Промежуточное время для параллельных запросов
      const parallelStartTime = performance.now()
      console.log('Начало выполнения параллельных запросов')

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
              onSuccess: () => {
                console.log('updateReport выполнен успешно')
                resolve()
              },
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
              console.log('postMacroSettings выполнен успешно')
              resolve()
            },
            onError: (error) => reject(error),
          })
        }),
      ])

      const parallelEndTime = performance.now()
      const parallelDuration = parallelEndTime - parallelStartTime
      console.log(
        `Параллельные запросы завершены за ${parallelDuration.toFixed(2)} мс`
      )

      // Промежуточное время для postSummary
      const summaryStartTime = performance.now()
      console.log('Начало выполнения postSummary')

      await new Promise<void>((resolve, reject) => {
        postSummary(undefined, {
          onSuccess: () => {
            console.log('Summary successfully posted')
            resolve()
          },
          onError: (error) => reject(error),
        })
      })

      const summaryEndTime = performance.now()
      const summaryDuration = summaryEndTime - summaryStartTime
      console.log(`postSummary завершен за ${summaryDuration.toFixed(2)} мс`)

      // Промежуточное время для postPortfolio
      const portfolioStartTime = performance.now()
      console.log('Начало выполнения postPortfolio')

      await new Promise<void>((resolve, reject) => {
        postPortfolio(undefined, {
          onSuccess: () => {
            console.log('Portfolio successfully posted')
            resolve()
          },
          onError: (error) => reject(error),
        })
      })

      const portfolioEndTime = performance.now()
      const portfolioDuration = portfolioEndTime - portfolioStartTime
      console.log(
        `postPortfolio завершен за ${portfolioDuration.toFixed(2)} мс`
      )

      // Промежуточное время для оставшихся операций
      const finalStepsStartTime = performance.now()
      console.log('Начало выполнения финальных операций')

      console.log('Все данные успешно отправлены')
      await queryClient.invalidateQueries({ queryKey: ['ProfileReportsData'] })
      await queryClient.invalidateQueries({ queryKey: ['ECLDataV1', date] })
      await queryClient.invalidateQueries({ queryKey: ['ECLDataV2', date] })

      const navigateStartTime = performance.now()
      console.log('Начало навигации')

      await router.navigate({ to: `/reports/${reportId}/dashboard` })

      const navigateEndTime = performance.now()
      const navigateDuration = navigateEndTime - navigateStartTime
      console.log(`Навигация завершена за ${navigateDuration.toFixed(2)} мс`)

      const finalStepsEndTime = performance.now()
      const finalStepsDuration = finalStepsEndTime - finalStepsStartTime
      console.log(
        `Финальные операции завершены за ${finalStepsDuration.toFixed(2)} мс`
      )

      // Общее время выполнения
      const totalEndTime = performance.now()
      const totalDuration = totalEndTime - totalStartTime
      console.log(
        `Общее время выполнения handlePostSettings: ${totalDuration.toFixed(2)} мс`
      )

      // Сводка времени выполнения
      console.table({
        'Параллельные запросы': `${parallelDuration.toFixed(2)} мс`,
        postSummary: `${summaryDuration.toFixed(2)} мс`,
        postPortfolio: `${portfolioDuration.toFixed(2)} мс`,
        'Финальные операции': `${finalStepsDuration.toFixed(2)} мс`,
        'в т.ч. Навигация': `${navigateDuration.toFixed(2)} мс`,
        'ОБЩЕЕ ВРЕМЯ': `${totalDuration.toFixed(2)} мс`,
      })
    } catch (error) {
      const totalEndTime = performance.now()
      const totalDuration = totalEndTime - totalStartTime
      console.error('Ошибка при отправке данных:', error)
      console.error(
        `Функция прервана с ошибкой через ${totalDuration.toFixed(2)} мс`
      )
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
              <img src="/img/logo.svg" alt="BANKO" className="w-52 py-2 pt-4" />
            </Link>

            <div className="w-full overflow-y-auto overflow-x-hidden p-5">
              <div className="rounded-lg border border-grey-900/30 bg-white p-4 shadow-lg">
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
