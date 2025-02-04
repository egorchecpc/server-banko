import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { GearIcon } from '@radix-ui/react-icons'

interface BIAnalyticsSettingsProps {
  onVisibilityChange: (visibleCharts: {
    gbv: boolean
    gbvStage: boolean
    vbsoku: boolean
    averagePD: boolean
    heatmap: boolean
    totalAmountOverdue: boolean
    ageingAmount: boolean
    distributionCategory: boolean
  }) => void
}

export const BIAnalyticsSettings: React.FC<BIAnalyticsSettingsProps> = ({
  onVisibilityChange,
}) => {
  const [chartVisibility, setChartVisibility] = useState({
    gbv: true,
    gbvStage: true,
    vbsoku: true,
    averagePD: true,
    heatmap: true,
    totalAmountOverdue: true,
    ageingAmount: true,
    distributionCategory: true,
  })

  const handleVisibilityChange = (chart: keyof typeof chartVisibility) => {
    const newVisibility = {
      ...chartVisibility,
      [chart]: !chartVisibility[chart],
    }
    setChartVisibility(newVisibility)
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
          <h4 className="font-medium leading-none">Отображение графиков</h4>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="gbv-chart"
              checked={chartVisibility.gbv}
              onCheckedChange={() => handleVisibilityChange('gbv')}
            />
            <label
              htmlFor="gbv-chart"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              График ВБС
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="gbv-stage-chart"
              checked={chartVisibility.gbvStage}
              onCheckedChange={() => handleVisibilityChange('gbvStage')}
            />
            <label
              htmlFor="gbv-stage-chart"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              График ВБС через стадии
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vbsoku-chart"
              checked={chartVisibility.vbsoku}
              onCheckedChange={() => handleVisibilityChange('vbsoku')}
            />
            <label
              htmlFor="vbsoku-chart"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              График ВБС/ОКУ
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="average-pd-chart"
              checked={chartVisibility.averagePD}
              onCheckedChange={() => handleVisibilityChange('averagePD')}
            />
            <label
              htmlFor="average-pd-chart"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              График средневзвешенного PD
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="heatmap-chart"
              checked={chartVisibility.heatmap}
              onCheckedChange={() => handleVisibilityChange('heatmap')}
            />
            <label
              htmlFor="heatmap-chart"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Тепловая карта
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="total-amount-overdue-chart"
              checked={chartVisibility.totalAmountOverdue}
              onCheckedChange={() =>
                handleVisibilityChange('totalAmountOverdue')
              }
            />
            <label
              htmlFor="total-amount-overdue-chart"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              График динамики задолженности продукта
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ageing-amount-chart"
              checked={chartVisibility.ageingAmount}
              onCheckedChange={() => handleVisibilityChange('ageingAmount')}
            />
            <label
              htmlFor="ageing-amount-chart"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              График распределения по срокам просрочки
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="distribution-category-chart"
              checked={chartVisibility.distributionCategory}
              onCheckedChange={() =>
                handleVisibilityChange('distributionCategory')
              }
            />
            <label
              htmlFor="distribution-category-chart"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              График распределения просрочек по категориям
            </label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
