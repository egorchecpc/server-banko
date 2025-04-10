import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import { ProfileReportData } from '@/models/ProfileReport'
import { scenarioNames } from '@/pages/Profile/TemplateDialog/TemplateDialogConfig'
import { indicatorNames } from '@/modules/SidebarModule/MacroSettings/MacroTemplateModal/MacroTemplateModal'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ReportDetailsProps {
  report: ProfileReportData
  onBtnClick?: (id: string) => void
}

interface ScenarioValues {
  value: number
  probability: number
}

export const ReportDetails = ({ report, onBtnClick }: ReportDetailsProps) => {
  const [openYears, setOpenYears] = useState<Record<string, boolean>>({})

  const formatIndicatorName = (indicatorKey: string) => {
    return (
      indicatorNames[indicatorKey as keyof typeof indicatorNames] ||
      indicatorKey
    )
  }

  const toggleYear = (year: string) => {
    setOpenYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }))
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Активный':
        return 'default'
      case 'Завершен':
        return 'accepted'
      case 'Черновик':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="mt-4 rounded-lg border border-grey-900/30 bg-white p-6 text-black-1000 shadow-lg">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black-1000">
              {report.title}
            </h2>
          </div>
          <Button
            variant="primary"
            className="transition-all hover:shadow-md"
            onClick={() =>
              onBtnClick ? onBtnClick(report.id) : console.log('no btn')
            }
          >
            Открыть отчёт
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-black-1000">
          <span className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {report.date}
          </span>

          <Badge variant={report.label === 'Черновик' ? 'outline' : 'accepted'}>
            {report.label}
          </Badge>

          <Badge
            variant={report.priority === 'Важный' ? 'destructive' : 'secondary'}
          >
            {report.priority}
          </Badge>

          <Badge variant={getStatusVariant(report.status)}>
            {report.status}
          </Badge>
        </div>
      </div>

      {/* Debtor Data Section */}
      <Card className="mb-6 overflow-hidden border-gray-200 shadow-sm transition-all hover:shadow-md">
        <CardHeader className="bg-gray-50 pb-3 text-xl font-bold leading-38 text-black-1000">
          Данные должника
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6 p-5 text-sm md:grid-cols-4">
          <div className="text-black-1000">
            <p className="mb-1 text-xs font-medium text-gray-500">
              Тип должника
            </p>
            <p className="font-medium text-black-1000">
              {report.debtorData.debtorType}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500">
              Вид кредита
            </p>
            <p className="font-medium text-black-1000">
              {report.debtorData.creditType?.join(', ')}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500">
              Вид продукта
            </p>
            <p className="font-medium text-black-1000">
              {report.debtorData.productType?.join(', ')}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500">
              Отчётная дата
            </p>
            <p className="font-medium text-black-1000">
              {
                new Date(report.debtorData.date || '')
                  .toISOString()
                  .split('T')[0]
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Macro Data Section */}
      <Card className="overflow-hidden border-gray-200 shadow-sm transition-all hover:shadow-md">
        <CardHeader className="bg-gray-50 pb-3 text-xl font-bold leading-38 text-black-1000">
          Макропоказатели
        </CardHeader>
        <CardContent className="space-y-4 p-5">
          {Object.entries(report.macroData).map(([year, data]) => (
            <Collapsible
              key={year}
              className="rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300"
              open={openYears[year]}
              onOpenChange={() => toggleYear(year)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4 transition-all hover:bg-gray-50">
                <span className="font-medium text-black-1000">
                  {year.replace('year', '')}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 transform text-gray-500 transition-transform duration-300 ease-in-out ${openYears[year] ? 'rotate-180' : 'rotate-0'}`}
                />
              </CollapsibleTrigger>

              {/* Custom animation for collapsible content */}
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  openYears[year] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="divide-y divide-gray-100 px-4 pb-4">
                  {Object.entries(data).map(([indicatorKey, scenarios]) => (
                    <div key={indicatorKey} className="py-4 first:pt-2">
                      <h4 className="mb-3 text-sm font-medium text-black-1000">
                        {formatIndicatorName(indicatorKey)}
                      </h4>
                      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                                Сценарий
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                                Значение
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                                Вероятность
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {Object.entries(
                              scenarios as Record<string, ScenarioValues>
                            ).map(([scenarioKey, values]) => (
                              <tr
                                key={scenarioKey}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-4 py-3 text-sm text-black-1000">
                                  {
                                    scenarioNames[
                                      scenarioKey as keyof typeof scenarioNames
                                    ]
                                  }
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-black-1000">
                                  {values.value}
                                </td>
                                <td className="px-4 py-3 text-sm text-black-1000">
                                  {(values.probability * 100).toFixed(0)}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
