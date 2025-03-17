import * as React from 'react'
import { Label, Pie, PieChart, Cell, LabelProps } from 'recharts'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  ContainerBody,
  ContainerComponent,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import { FC } from 'react'
import {
  addColorsToChartData,
  createChartConfig,
  ExtendedViewBox,
} from '@/modules/GBVChartModule/GBVChartConfig'
import { GBVData } from '@/models/GBV'
import ChartControls from '@/modules/ChartControlModule/ChartControl'
import { downloadExcelFile } from '@/utils/downloadUtils'

interface GBVChartProps {
  data: GBVData[]
}

export const GBVChartModule: FC<GBVChartProps> = ({ data }) => {
  const { t } = useTranslation()
  const chartConfig = createChartConfig(data) as ChartConfig
  const totalCredit = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.value, 0),
    [data]
  )
  const coloredChartData = addColorsToChartData(data)

  const renderLabel = ({ viewBox }: LabelProps) => {
    if (!viewBox) return null
    const { cx, cy } = viewBox as ExtendedViewBox
    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
        <tspan
          x={cx}
          y={cy - 20}
          className="fill-muted-foreground text-ssm leading-14 text-grey-900"
        >
          {t('biAnalytics.gbvChart.subtitle')}
        </tspan>
        <tspan
          x={cx}
          y={cy}
          className="fill-foreground text-[14px] font-bold leading-18 text-black-1000"
        >
          {totalCredit.toLocaleString()}
        </tspan>
        <tspan
          x={cx}
          y={cy + 24}
          className="fill-foreground text-[14px] font-bold leading-18 text-black-1000"
        >
          BYN
        </tspan>
      </text>
    )
  }

  const renderLegend = () => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-4">
        {Object.entries(chartConfig)
          .filter(([key]) => key !== 'value')
          .slice(0, 2)
          .map(([key, { label, color }]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="h-4 w-4" style={{ backgroundColor: color }} />
              <span>{label}</span>
            </div>
          ))}
      </div>
      {Object.entries(chartConfig)
        .filter(([key]) => key !== 'value')
        .slice(2, 3)
        .map(([key, { label, color }]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="h-4 w-4" style={{ backgroundColor: color }} />
            <span>{label}</span>
          </div>
        ))}
    </div>
  )

  const onDownoload = () => {
    downloadExcelFile('/data/chart1.xlsx', 'vbs.xlsx')
  }
  return (
    <ContainerComponent withBg={true}>
      <ContainerHeader>
        <div className="flex w-full items-center justify-between">
          <div className="text-xl font-bold leading-24 text-black-1000">
            {t('biAnalytics.gbvChart.title')}
          </div>
          <ChartControls
            chartDescription={t('biAnalytics.gbvChart.title')}
            onDownload={onDownoload}
          />
        </div>
      </ContainerHeader>
      <ContainerBody isScrolling={false}>
        <Card className="flex max-h-[19rem] flex-col border-none">
          <CardContent className="flex justify-center pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[16rem] min-w-[16rem]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={coloredChartData}
                  dataKey="value"
                  nameKey="product"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  cornerRadius={3}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                >
                  {coloredChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <Label content={renderLabel} />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>{renderLegend()}</CardFooter>
        </Card>
      </ContainerBody>
    </ContainerComponent>
  )
}
