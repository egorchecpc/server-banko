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
    <div className="text-black-1000 mt-4 rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-black-1000 text-2xl font-bold">
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

        <div className="text-black-1000 mt-2 flex items-center gap-2 text-sm">
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
        <CardHeader className="text-black-1000 pb-3 text-xl font-bold leading-38">
          Данные должника
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div className="text-black-1000">
            <p className="text-muted-foreground text-black-1000">
              Тип должника
            </p>
            <p className="text-black-1000 font-medium">
              {report.debtorData.debtorType}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-black-1000">Вид кредита</p>
            <p className="text-black-1000 font-medium">
              {report.debtorData.creditType?.join(', ')}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-black-1000">
              Вид продукта
            </p>
            <p className="text-black-1000 font-medium">
              {report.debtorData.productType?.join(', ')}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-black-1000">
              Отчётная дата
            </p>
            <p className="text-black-1000 font-medium">
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
        <CardHeader className="text-black-1000 pb-3 text-xl font-bold leading-38">
          Макропоказатели
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(report.macroData).map(([year, data]) => (
            <Collapsible key={year} className="rounded-lg border bg-gray-50">
              <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3">
                <span className="text-black-1000 font-medium">
                  {year.replace('year', '')}
                </span>
                <ChevronDownIcon className="h-4 w-4 transition-transform duration-200" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                {Object.entries(data).map(([indicatorKey, scenarios]) => (
                  <div key={indicatorKey} className="mb-4 last:mb-0">
                    <h4 className="text-black-1000 mb-2 text-sm font-medium">
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
                              <td className="text-black-1000 px-3 py-2 text-sm">
                                {
                                  scenarioNames[
                                    scenarioKey as keyof typeof scenarioNames
                                  ]
                                }
                              </td>
                              <td className="text-black-1000 px-3 py-2 text-sm">
                                {values.value}
                              </td>
                              <td className="text-black-1000 px-3 py-2 text-sm">
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
