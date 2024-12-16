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
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { GearIcon } from '@radix-ui/react-icons'
import PDTable from '@/components/Tables/PDTable/PDTable'
import { useTranslation } from 'react-i18next'
import { PDItem } from '@/models/PD'

interface PDDisplayModuleProps {
  yearlyPDData: {
    cPDYears: PDItem[]
    mPDYears: PDItem[]
  }
  quarterlyPDData: {
    cPDQData: PDItem[]
    mPDQData: PDItem[]
  }
}

const PDDisplayModule: FC<PDDisplayModuleProps> = ({
  yearlyPDData,
  quarterlyPDData,
}) => {
  const [deltaMode, setDeltaMode] = useState(false)
  const [displayQuarterly, setDisplayQuarterly] = useState(false)
  const { t } = useTranslation()

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
      </DropdownMenuContent>
    </DropdownMenu>
  )

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
          data={
            displayQuarterly ? quarterlyPDData.cPDQData : yearlyPDData.cPDYears
          }
          deltaMode={deltaMode}
          displayQuarterly={displayQuarterly}
        />
      </ContainerBody>
    </ContainerComponent>
  )
}

export default PDDisplayModule
