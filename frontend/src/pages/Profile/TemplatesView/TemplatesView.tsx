import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, Plus, ChevronDown } from 'lucide-react'
import { MacroTemplate } from '@/models/MacroTemplate'
import { TemplateDialog } from '@/pages/Profile/TemplateDialog/TemplateDialog'
import { indicatorNames } from '@/modules/SidebarModule/MacroSettings/MacroTemplateModal/MacroTemplateModal'
import { scenarioNames } from '@/pages/Profile/TemplateDialog/TemplateDialogConfig'
import LoadingSpinner from '@/components/LoadingSpinnerComponent/LoadingSpinner'

interface TemplatesViewProps {
  templates: MacroTemplate[]
  isLoading: boolean
  onUpdateTemplate: (template: MacroTemplate) => void
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templates,
  isLoading,
  onUpdateTemplate,
}) => {
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState<MacroTemplate | null>(
    null
  )
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(
    null
  )

  const handleEditTemplate = (template: MacroTemplate) => {
    setCurrentTemplate(template)
    setTemplateDialogOpen(true)
  }

  const handleAddTemplate = () => {
    setCurrentTemplate(null)
    setTemplateDialogOpen(true)
  }

  const toggleCardExpansion = (templateId: string) => {
    setExpandedTemplateId((prev) => (prev === templateId ? null : templateId))
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  const renderIndicatorTable = (indicator: any) => {
    // Получаем все годы из данных
    const years = Object.keys(indicator.values).sort()
    // Получаем все сценарии из первого года (структура одинакова для всех лет)
    const scenarios = Object.keys(indicator.values[years[0]])

    return (
      <div className="mt-4 rounded-lg bg-white p-4">
        <h3 className="mb-4 text-sm font-bold leading-5 text-black-800">
          {indicatorNames[indicator.type]}
        </h3>
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-1"></div>
          {scenarios.map((scenario) => (
            <div
              key={scenario}
              className="text-center text-ssm font-normal leading-14 text-grey-900"
            >
              {scenarioNames[scenario]}
            </div>
          ))}

          {years.map((year) => (
            <React.Fragment key={year}>
              <div className="mt-4 text-sm font-bold leading-4 text-grey-900">
                {year} 01.01
              </div>
              {scenarios.map((scenario) => (
                <div
                  key={`${year}-${scenario}`}
                  className={`rounded-lg py-3 text-center ${
                    scenario === 'worst'
                      ? 'bg-lite-orange/5'
                      : scenario === 'best'
                        ? 'bg-lite-green'
                        : 'bg-gray-50'
                  }`}
                >
                  <div className="text-sm font-normal leading-15 text-black-800">
                    {indicator.values[year][scenario].value}
                  </div>
                  <div className="text-sm font-normal leading-15 text-black-800">
                    ({indicator.values[year][scenario].probability}%)
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <div className="text-2xl font-bold leading-38 text-black-900">
          Шаблоны макропоказателей
        </div>
        <div className="mb-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddTemplate}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {templates.map((template) => {
          const [firstIndicator, ...otherIndicators] =
            template.indicators.slice(0, 5)

          return (
            <Card key={template.id} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{template.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>

                {firstIndicator && renderIndicatorTable(firstIndicator)}

                {otherIndicators.length > 0 && (
                  <>
                    <Button
                      variant="ghost"
                      className="mt-4 w-full"
                      onClick={() => toggleCardExpansion(template.id)}
                    >
                      <div className="flex items-center gap-2">
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            expandedTemplateId === template.id
                              ? 'rotate-180'
                              : ''
                          }`}
                        />
                        <span>Показать еще ({otherIndicators.length})</span>
                      </div>
                    </Button>

                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        expandedTemplateId === template.id
                          ? 'max-h-[2000px]'
                          : 'max-h-0'
                      }`}
                    >
                      {otherIndicators.map((indicator) =>
                        renderIndicatorTable(indicator)
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <TemplateDialog
        open={templateDialogOpen}
        onOpenChange={setTemplateDialogOpen}
        template={currentTemplate}
        onSave={onUpdateTemplate}
      />
    </div>
  )
}
