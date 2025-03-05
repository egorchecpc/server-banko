import { FC, useState } from 'react'
import {
  ContainerComponent,
  ContainerBody,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { GearIcon } from '@radix-ui/react-icons'
import PDTable from '@/components/Tables/PDTable/PDTable'
import { useTranslation } from 'react-i18next'
import {
  ForecastDataResponse,
  QuarterlyDataResponse,
  YearlyDataResponse,
} from '@/models/PD'
import PDChartsModal from '@/modules/PDDisplayModule/PDChart/PDChartsModal'
import PDChart from '@/modules/PDDisplayModule/PDChart/PDChart'

interface PDDisplayModuleProps {
  yearlyPDData: YearlyDataResponse
  quarterlyPDData: QuarterlyDataResponse
  forecastPDData: ForecastDataResponse
  customTitle?: string
}

const categories = [
  'without',
  'between1To30',
  'between31To60',
  'between61To90',
  'moreThen90',
] as const

const PDDisplayModule: FC<PDDisplayModuleProps> = ({
  yearlyPDData,
  quarterlyPDData,
  forecastPDData,
  customTitle = '',
}) => {
  const [deltaMode, setDeltaMode] = useState(true)
  const [displayQuarterly, setDisplayQuarterly] = useState(false)
  const [showHistoricalTCC, setShowHistoricalTCC] = useState(false)
  const [isChartModalOpen, setIsChartModalOpen] = useState(false)
  const { t } = useTranslation()

  const categoryName: Record<(typeof categories)[number], string> = {
    without: t('categories.without'),
    between1To30: t('categories.between1To30'),
    between31To60: t('categories.between31To60'),
    between61To90: t('categories.between61To90'),
    moreThen90: t('categories.moreThen90Percent'),
  }
  const renderSettings = (
    onDeltaChange: () => void,
    onQuarterlyChange: () => void,
    onHistoricalTCCChange: () => void
  ) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="!ring-none rounded-full p-2 hover:bg-gray-200">
          <GearIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[240px]">
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <div className="flex w-full items-center justify-between">
            <span className="mr-4 truncate">
              {t('dashboard.tables.pdTable.buttons.deltaBtn')}
            </span>
            <Switch checked={deltaMode} onCheckedChange={onDeltaChange} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <div className="flex w-full items-center justify-between">
            <span className="mr-4 truncate">
              {t('dashboard.tables.pdTable.buttons.historicalTCCBtn') ||
                'PD TCC Historical'}
            </span>
            <Switch
              checked={showHistoricalTCC}
              onCheckedChange={onHistoricalTCCChange}
            />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <div className="flex w-full items-center justify-between">
            <span className="mr-4 truncate">
              {t('dashboard.tables.pdTable.buttons.qBtn')}
            </span>
            <Switch
              checked={displayQuarterly}
              onCheckedChange={onQuarterlyChange}
            />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsChartModalOpen(true)}>
          {t('dashboard.tables.pdTable.buttons.chartBtn')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const prepareTableData = () => {
    // Apply historical filter if needed
    const filteredYearlyData = Object.entries(yearlyPDData).filter(([year]) => {
      // If showHistoricalTCC is false, filter out years 2021-2023
      if (!showHistoricalTCC) {
        return !['year2021', 'year2022', 'year2023'].includes(year)
      }
      return true
    })

    if (!displayQuarterly) {
      return filteredYearlyData.map(([year, { cpd }]) => ({
        ...cpd,
        year: year.replace('year', ''),
        isYearly: true,
      }))
    }

    const quarterlyData = Object.entries(quarterlyPDData).flatMap(
      ([yearKey, quarterData]) => {
        const year = yearKey.replace('year', '')

        if (!Array.isArray(quarterData)) {
          console.warn(`No quarterly data for year ${year}`)
          return []
        }

        return quarterData.map((quarterItem) => ({
          ...quarterItem,
          year,
          isYearly: false,
        }))
      }
    )

    const quarterlyYears = new Set(
      Object.keys(quarterlyPDData).map((year) => year.replace('year', ''))
    )

    const yearlyDataFiltered = filteredYearlyData
      .filter(([year]) => !quarterlyYears.has(year.replace('year', '')))
      .map(([year, { cpd }]) => ({
        ...cpd,
        year: year.replace('year', ''),
        isYearly: true,
      }))

    const allData = [...quarterlyData, ...yearlyDataFiltered]

    return allData.sort((a, b) => a.date.localeCompare(b.date))
  }

  const tableData = prepareTableData()

  return (
    <ContainerComponent withBg={true}>
      <ContainerHeader>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold leading-24 text-black-800">
            {customTitle
              ? `PD ${customTitle}`
              : t('dashboard.tables.pdTable.cPDTitle')}
          </div>
          {renderSettings(
            () => setDeltaMode(!deltaMode),
            () => setDisplayQuarterly(!displayQuarterly),
            () => setShowHistoricalTCC(!showHistoricalTCC)
          )}
        </div>
      </ContainerHeader>
      <ContainerBody isScrolling={true}>
        <PDTable
          data={tableData}
          deltaMode={deltaMode}
          displayQuarterly={displayQuarterly}
        />
      </ContainerBody>
      <PDChartsModal
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
      >
        {categories
          .filter((category) => category !== 'moreThen90')
          .map((category) => {
            const chartData = Object.entries(forecastPDData).map(
              ([yearKey, { cpd, mpd }]) => ({
                period: yearKey.replace('year', ''),
                cPD: Number(cpd[category] ?? 0),
                mPD: Number(mpd[category] ?? 0),
              })
            )

            return (
              <PDChart
                key={category}
                title={`${categoryName[category]}`}
                data={chartData}
              />
            )
          })}
      </PDChartsModal>
    </ContainerComponent>
  )
}

export default PDDisplayModule
