import { FC, useState } from 'react'
import {
  ContainerComponent,
  ContainerHeader,
  ContainerBody,
} from '@/components/ContainerComponent/ContainerComponent'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

interface PDDisplayModuleTabsProps {
  defaultData: {
    yearlyPDData: YearlyDataResponse
    quarterlyPDData: QuarterlyDataResponse
    forecastPDData: ForecastDataResponse
  }
  creditTypeData?: Record<
    string,
    {
      yearlyPDData: YearlyDataResponse
      quarterlyPDData: QuarterlyDataResponse
    }
  >
  creditTypes: string[]
}

const categories = [
  'without',
  'between1To30',
  'between31To60',
  'between61To90',
  'moreThen90',
] as const

const PDDisplayModuleTabs: FC<PDDisplayModuleTabsProps> = ({
  defaultData,
  creditTypeData = {},
  creditTypes,
}) => {
  const [deltaMode, setDeltaMode] = useState(true)
  const [displayQuarterly, setDisplayQuarterly] = useState(false)
  const [showHistoricalTCC, setShowHistoricalTCC] = useState(false)
  const [isChartModalOpen, setIsChartModalOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState('default')
  const [additionalTables, setAdditionalTables] = useState<
    Record<string, boolean>
  >({})
  const { t } = useTranslation()

  const categoryName: Record<(typeof categories)[number], string> = {
    without: t('categories.without'),
    between1To30: t('categories.between1To30'),
    between31To60: t('categories.between31To60'),
    between61To90: t('categories.between61To90'),
    moreThen90: t('categories.moreThen90Percent'),
  }

  const toggleAdditionalTable = (type: string) => {
    setAdditionalTables((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
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

        {creditTypes.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled
              className="text-sm font-semibold opacity-70"
            >
              Отобразить дополнительные таблицы
            </DropdownMenuItem>
            {['default', ...creditTypes].map((type) => (
              <DropdownMenuCheckboxItem
                key={`additional-table-${type}`}
                checked={additionalTables[type]}
                onCheckedChange={() => toggleAdditionalTable(type)}
              >
                {type === 'default' ? 'Кумулятивный cPD' : type}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const prepareTableData = (
    yearlyData: YearlyDataResponse,
    quarterlyData: QuarterlyDataResponse
  ) => {
    // Apply historical filter if needed
    const filteredYearlyData = Object.entries(yearlyData).filter(([year]) => {
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

    const quarterlyDataArray = Object.entries(quarterlyData).flatMap(
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
      Object.keys(quarterlyData).map((year) => year.replace('year', ''))
    )

    const yearlyDataFiltered = filteredYearlyData
      .filter(([year]) => !quarterlyYears.has(year.replace('year', '')))
      .map(([year, { cpd }]) => ({
        ...cpd,
        year: year.replace('year', ''),
        isYearly: true,
      }))

    const allData = [...quarterlyDataArray, ...yearlyDataFiltered]

    return allData.sort((a, b) => a.date.localeCompare(b.date))
  }

  const getTabData = (tabName: string) => {
    if (tabName === 'default') {
      return {
        yearlyPDData: defaultData.yearlyPDData,
        quarterlyPDData: defaultData.quarterlyPDData,
        forecastPDData: defaultData.forecastPDData,
        title: '',
      }
    } else {
      return {
        yearlyPDData:
          creditTypeData[tabName]?.yearlyPDData || defaultData.yearlyPDData,
        quarterlyPDData:
          creditTypeData[tabName]?.quarterlyPDData ||
          defaultData.quarterlyPDData,
        forecastPDData: defaultData.forecastPDData,
        title: tabName,
      }
    }
  }

  const getCurrentTabData = () => getTabData(currentTab)
  const currentData = getCurrentTabData()
  const tableData = prepareTableData(
    currentData.yearlyPDData,
    currentData.quarterlyPDData
  )

  return (
    <>
      <ContainerComponent withBg={true}>
        <ContainerHeader className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold leading-24 text-black-1000">
              {currentData.title
                ? `PD ${currentData.title}`
                : t('dashboard.tables.pdTable.cPDTitle')}
            </div>
            {renderSettings(
              () => setDeltaMode(!deltaMode),
              () => setDisplayQuarterly(!displayQuarterly),
              () => setShowHistoricalTCC(!showHistoricalTCC)
            )}
          </div>
          <Tabs
            defaultValue="default"
            value={currentTab}
            onValueChange={setCurrentTab}
          >
            <TabsList className="mb-2">
              <TabsTrigger value="default">Кумулятивный cPD</TabsTrigger>
              {creditTypes.map((type) => (
                <TabsTrigger key={`tab-${type}`} value={type}>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
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
              const chartData = Object.entries(currentData.forecastPDData).map(
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

      {/* Render additional tables based on checkbox selections */}
      {Object.entries(additionalTables)
        .filter(([type, isSelected]) => isSelected && type !== currentTab)
        .map(([type]) => {
          const tabData = getTabData(type)
          const additionalTableData = prepareTableData(
            tabData.yearlyPDData,
            tabData.quarterlyPDData
          )

          return (
            <ContainerComponent
              key={`additional-table-${type}`}
              withBg={true}
              className="mt-3"
            >
              <ContainerHeader>
                <div className="text-xl font-bold leading-24 text-black-1000">
                  {type === 'default'
                    ? t('dashboard.tables.pdTable.cPDTitle')
                    : `PD ${type}`}
                </div>
              </ContainerHeader>
              <ContainerBody isScrolling={true}>
                <PDTable
                  data={additionalTableData}
                  deltaMode={deltaMode}
                  displayQuarterly={displayQuarterly}
                />
              </ContainerBody>
            </ContainerComponent>
          )
        })}
    </>
  )
}

export default PDDisplayModuleTabs
