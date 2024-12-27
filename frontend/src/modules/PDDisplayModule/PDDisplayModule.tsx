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
}) => {
  const [deltaMode, setDeltaMode] = useState(false)
  const [displayQuarterly, setDisplayQuarterly] = useState(false)
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
    onQuarterlyChange: () => void
  ) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="!ring-none rounded-full p-2 hover:bg-gray-200">
          <GearIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <div className="flex items-center gap-11">
            <div className="w-full">
              {t('dashboard.tables.pdTable.buttons.deltaBtn')}
            </div>
            <Switch checked={deltaMode} onCheckedChange={onDeltaChange} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <div className="flex items-center gap-2">
            <div className="w-full">
              {t('dashboard.tables.pdTable.buttons.qBtn')}
            </div>
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
    console.log('Raw quarterlyPDData:', quarterlyPDData)

    if (!displayQuarterly) {
      return Object.entries(yearlyPDData).map(([year, { cpd }]) => ({
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

    const yearlyDataFiltered = Object.entries(yearlyPDData)
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
            {t('dashboard.tables.pdTable.cPDTitle')}
          </div>
          {renderSettings(
            () => setDeltaMode(!deltaMode),
            () => setDisplayQuarterly(!displayQuarterly)
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
        {categories.map((category) => {
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
