import { FC, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GearIcon } from '@radix-ui/react-icons'
import {
  ContainerComponent,
  ContainerHeader,
  ContainerBody,
} from '@/components/ContainerComponent/ContainerComponent'
import LGDTable from './LGDTable'
import { LGDItem } from '@/models/LGD'

interface LGDDisplayModuleTabsProps {
  defaultData: LGDItem[]
  creditTypeData: Record<string, LGDItem[]>
  creditTypes: string[]
}

const LGDDisplayModuleTabs: FC<LGDDisplayModuleTabsProps> = ({
  defaultData,
  creditTypeData,
  creditTypes,
}) => {
  const [currentTab, setCurrentTab] = useState('default')
  const [additionalTables, setAdditionalTables] = useState<
    Record<string, boolean>
  >({})

  const getTabData = (tab: string): LGDItem[] =>
    tab === 'default' ? defaultData : creditTypeData[tab] || defaultData

  const currentData = getTabData(currentTab)

  const toggleAdditionalTable = (type: string) => {
    setAdditionalTables((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const renderSettings = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="!ring-none rounded-full p-2 hover:bg-gray-200">
          <GearIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[240px]">
        <DropdownMenuItem disabled className="text-sm font-semibold opacity-70">
          Отобразить дополнительные таблицы
        </DropdownMenuItem>
        {['default', ...creditTypes].map((type) => (
          <DropdownMenuCheckboxItem
            key={`additional-lgd-${type}`}
            checked={additionalTables[type]}
            onCheckedChange={() => toggleAdditionalTable(type)}
          >
            {type === 'default' ? 'Сводная LGD' : `LGD ${type}`}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <>
      <ContainerComponent withBg={true}>
        <ContainerHeader className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold leading-24 text-black-1000">
              {currentTab === 'default'
                ? 'Убыток в случае дефолта (LGD)'
                : `LGD ${currentTab}`}
            </div>
            {renderSettings()}
          </div>

          <Tabs
            defaultValue="default"
            value={currentTab}
            onValueChange={setCurrentTab}
          >
            <TabsList className="mb-2">
              <TabsTrigger value="default">Сводная LGD</TabsTrigger>
              {creditTypes.map((type) => (
                <TabsTrigger key={`tab-${type}`} value={type}>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </ContainerHeader>

        <ContainerBody isScrolling={true}>
          <LGDTable
            data={currentData}
            customTitle={currentTab !== 'default' ? currentTab : undefined}
          />
        </ContainerBody>
      </ContainerComponent>

      {/* Дополнительные таблицы по чекбоксам */}
      {Object.entries(additionalTables)
        .filter(([type, isSelected]) => isSelected && type !== currentTab)
        .map(([type]) => {
          const tabData = getTabData(type)
          return (
            <ContainerComponent
              key={`additional-lgd-table-${type}`}
              withBg={true}
              className="mt-3"
            >
              <ContainerHeader>
                <div className="text-xl font-bold leading-24 text-black-1000">
                  {type === 'default' ? 'Сводная LGD' : `LGD ${type}`}
                </div>
              </ContainerHeader>
              <ContainerBody isScrolling={true}>
                <LGDTable data={tabData} customTitle={type} />
              </ContainerBody>
            </ContainerComponent>
          )
        })}
    </>
  )
}

export default LGDDisplayModuleTabs
