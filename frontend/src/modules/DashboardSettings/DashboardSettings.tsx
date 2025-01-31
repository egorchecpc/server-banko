import React, { useState } from 'react'
import { GearIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'

interface DashboardSettingsProps {
  onVisibilityChange: (visibleTables: {
    pd: boolean
    lgd: boolean
    pcure: boolean
    ecl: boolean
    kpi: boolean
    risk: boolean
  }) => void
}

export const DashboardSettings: React.FC<DashboardSettingsProps> = ({
  onVisibilityChange,
}) => {
  const [tableVisibility, setTableVisibility] = useState({
    pd: true,
    lgd: true,
    pcure: true,
    ecl: true,
    kpi: true,
    risk: true,
  })

  const handleVisibilityChange = (table: keyof typeof tableVisibility) => {
    const newVisibility = {
      ...tableVisibility,
      [table]: !tableVisibility[table],
    }
    setTableVisibility(newVisibility)
    onVisibilityChange(newVisibility)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="!ring-none rounded-full hover:bg-gray-200"
        >
          <GearIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Отображение таблиц</h4>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pd-table"
              checked={tableVisibility.pd}
              onCheckedChange={() => handleVisibilityChange('pd')}
            />
            <label
              htmlFor="pd-table"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Таблица PD
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lgd-table"
              checked={tableVisibility.lgd}
              onCheckedChange={() => handleVisibilityChange('lgd')}
            />
            <label
              htmlFor="lgd-table"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Таблица LGD
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pcure-table"
              checked={tableVisibility.pcure}
              onCheckedChange={() => handleVisibilityChange('pcure')}
            />
            <label
              htmlFor="pcure-table"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Таблица PCure
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ecl-table"
              checked={tableVisibility.ecl}
              onCheckedChange={() => handleVisibilityChange('ecl')}
            />
            <label
              htmlFor="ecl-table"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Таблица ECL
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="kpi-table"
              checked={tableVisibility.kpi}
              onCheckedChange={() => handleVisibilityChange('kpi')}
            />
            <label
              htmlFor="kpi-table"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Таблица KPI
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="risk-table"
              checked={tableVisibility.risk}
              onCheckedChange={() => handleVisibilityChange('risk')}
            />
            <label
              htmlFor="risk-table"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Таблица рисков
            </label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
