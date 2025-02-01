import React, { FC, useEffect, useState } from 'react'
import { DownloadIcon, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MacroTable } from '@/components/Tables/MacroTable/MacroTable'
import { MacroSettingsModal } from './MacroSettingsModal/MacroSettingsModal'
import { useTranslation } from 'react-i18next'
import { MacroSettings } from '@/models/MacroSettings'
import { useGetReportDataById } from '@/hooks/apiHooks/commonHooks/useGetReportsData'
import { useParams } from '@tanstack/react-router'
import { MacroTemplateModal } from '@/modules/SidebarModule/MacroSettings/MacroTemplateModal/MacroTemplateModal'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'

interface MacroSettingsProps {
  setMacroData: React.Dispatch<
    React.SetStateAction<MacroSettings[] | undefined>
  >
  postSettings: () => void
  years: (string | number)[]
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  isTemplateModalOpen: boolean
  setIsTemplateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MacroSettingsComponent: FC<MacroSettingsProps> = ({
  setMacroData,
  years,
  postSettings,
  isDialogOpen,
  setIsDialogOpen,
  isTemplateModalOpen,
  setIsTemplateModalOpen,
}) => {
  const { reportId } = useParams({ strict: false })
  const { macroData, isLoading, error } = useGetReportDataById(
    reportId ? reportId : ''
  )
  const { t } = useTranslation()
  const [indicators, setIndicators] = useState<MacroSettings[]>(
    macroData ? macroData : []
  )

  useEffect(() => {
    if (macroData) {
      setIndicators(macroData)
      setMacroData(macroData)
    }
  }, [macroData])

  const [editingIndicator, setEditingIndicator] =
    useState<MacroSettings | null>(null)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const macroIndicators = [
    'productProfitability',
    'realWage',
    'gdp',
    'realDisposablePopulationIncome',
    'averageMonthlySalary',
  ]

  const handleAdd = (newIndicator: MacroSettings) => {
    const updatedIndicators = [...indicators, newIndicator]
    setIndicators(updatedIndicators)
    setMacroData(updatedIndicators)
  }

  const handleEdit = (updatedIndicator: MacroSettings) => {
    const updatedIndicators = indicators.map((ind) =>
      ind.id === updatedIndicator.id ? updatedIndicator : ind
    )
    setIndicators(updatedIndicators)
    setMacroData(updatedIndicators)
  }

  const handleDelete = (id: string) => {
    const updatedIndicators = indicators.filter((ind) => ind.id !== id)
    setIndicators(updatedIndicators)
    setMacroData(updatedIndicators)
  }

  const handleTemplateSelect = (templateIndicators: MacroSettings[]) => {
    setIndicators(templateIndicators)
    setMacroData(templateIndicators)
    setIsTemplateModalOpen(false)
  }

  const scenarios = ['worst', 'norm', 'best']

  return (
    <div className="relative mx-auto p-0">
      <div className="mb-1 mt-6 flex items-center justify-between gap-9">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold">
            {t('sidebar.macroSettings.title')}
          </h2>
          <Button
            className="p-0 text-blue-900 hover:text-charts-60"
            onClick={() => {
              setIsTemplateModalOpen(true)
            }}
          >
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="p-0 text-blue-900 hover:text-charts-60"
          onClick={() => {
            setEditingIndicator(null)
            setIsDialogOpen(true)
          }}
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
      {indicators.length === 0 ? (
        <p className="text-sm font-normal leading-18 text-grey-900">
          {t('sidebar.macroSettings.subtext')}
        </p>
      ) : (
        <MacroTable
          years={years}
          btnText={t('sidebar.macroSettings.modal.buttons.recalculate')}
          indicators={indicators}
          scenarios={scenarios}
          postSettings={postSettings}
          onEdit={(indicator) => {
            setEditingIndicator(indicator)
            setIsDialogOpen(true)
          }}
          onDelete={handleDelete}
        />
      )}

      <MacroSettingsModal
        years={years}
        isOpen={isDialogOpen}
        scenarios={scenarios}
        macroIndicators={macroIndicators}
        onClose={() => setIsDialogOpen(false)}
        onSubmitForm={(data) => {
          if (editingIndicator) {
            handleEdit({ ...data, id: editingIndicator.id })
          } else {
            handleAdd({ ...data, id: Date.now().toString() })
          }
          setIsDialogOpen(false)
          setEditingIndicator(null)
        }}
        editingIndicator={editingIndicator}
      />

      <MacroTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  )
}
