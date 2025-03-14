import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import { ProfileReportData } from '@/models/ProfileReport'
import { scenarioNames } from '@/pages/Profile/TemplateDialog/TemplateDialogConfig'
import { indicatorNames } from '@/modules/SidebarModule/MacroSettings/MacroTemplateModal/MacroTemplateModal'
import { Button } from '@/components/ui/button'

interface ReportDetailsProps {
  report: ProfileReportData
  onBtnClick?: (id: string) => void
}
interface ScenarioValues {
  value: number
  probability: number
}

export const ReportDetails = ({ report, onBtnClick }: ReportDetailsProps) => {
  const formatIndicatorName = (indicatorKey: string) => {
    return (
      indicatorNames[indicatorKey as keyof typeof indicatorNames] ||
      indicatorKey
    )
  }

  return (
    <div className="mt-4 rounded-lg border border-grey-900/30 bg-white p-6 text-black-1000 shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black-1000">
              {report.title}
            </h2>
          </div>
          <Button
            variant="primary"
            onClick={() =>
              onBtnClick ? onBtnClick(report.id) : console.log('no btn')
            }
          >
            Открыть отчёт
          </Button>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-black-1000">
          <span>{report.date}</span>
          <Badge variant={report.label === 'Черновик' ? 'outline' : 'accepted'}>
            {report.label}
          </Badge>
          <Badge
            variant={report.priority === 'Важный' ? 'destructive' : 'secondary'}
          >
            {report.priority}
          </Badge>
        </div>
      </div>

      {/* Debtor Data Section */}
      <Card className="mb-6">
        <CardHeader className="pb-3 text-xl font-bold leading-38 text-black-1000">
          Данные должника
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div className="text-black-1000">
            <p className="text-muted-foreground text-black-1000">
              Тип должника
            </p>
            <p className="font-medium text-black-1000">
              {report.debtorData.debtorType}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-black-1000">Вид кредита</p>
            <p className="font-medium text-black-1000">
              {report.debtorData.creditType?.join(', ')}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-black-1000">
              Вид продукта
            </p>
            <p className="font-medium text-black-1000">
              {report.debtorData.productType?.join(', ')}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-black-1000">
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
      <Card>
        <CardHeader className="pb-3 text-xl font-bold leading-38 text-black-1000">
          Макропоказатели
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(report.macroData).map(([year, data]) => (
            <Collapsible key={year} className="rounded-lg border bg-gray-50">
              <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3">
                <span className="font-medium text-black-1000">
                  {year.replace('year', '')}
                </span>
                <ChevronDownIcon className="h-4 w-4 transition-transform duration-200" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                {Object.entries(data).map(([indicatorKey, scenarios]) => (
                  <div key={indicatorKey} className="mb-4 last:mb-0">
                    <h4 className="mb-2 text-sm font-medium text-black-1000">
                      {formatIndicatorName(indicatorKey)}
                    </h4>
                    <div className="overflow-hidden rounded border bg-white">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                              Сценарий
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                              Значение
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                              Вероятность
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(
                            scenarios as Record<string, ScenarioValues>
                          ).map(([scenarioKey, values]) => (
                            <tr key={scenarioKey} className="border-t">
                              <td className="px-3 py-2 text-sm text-black-1000">
                                {
                                  scenarioNames[
                                    scenarioKey as keyof typeof scenarioNames
                                  ]
                                }
                              </td>
                              <td className="px-3 py-2 text-sm text-black-1000">
                                {values.value}
                              </td>
                              <td className="px-3 py-2 text-sm text-black-1000">
                                {values.probability * 100}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
