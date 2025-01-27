import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, Plus } from 'lucide-react'
import { MacroTemplate } from '@/models/MacroTemplate'
import { TemplateDialog } from '@/pages/Profile/TemplateDialog/TemplateDialog'
import { indicatorNames } from '@/modules/SidebarModule/MacroSettings/MacroTemplateModal/MacroTemplateModal'
import { scenarioNames } from '@/pages/Profile/TemplateDialog/TemplateDialogConfig'

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

  const handleEditTemplate = (template: MacroTemplate) => {
    setCurrentTemplate(template)
    setTemplateDialogOpen(true)
  }

  const handleAddTemplate = () => {
    setCurrentTemplate(null)
    setTemplateDialogOpen(true)
  }

  if (isLoading) {
    return <div>Loading templates...</div>
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

      {templates.map((template) => (
        <Card key={template.id}>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">{template.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditTemplate(template)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {template.indicators.slice(0, 5).map((indicator) => (
                <div key={indicator.id} className="border-t pt-4">
                  <p className="font-medium">
                    {indicatorNames[indicator.type]}
                  </p>
                  <div className="mt-2 grid grid-cols-4 gap-4">
                    {Object.entries(indicator.values[2024]).map(
                      ([scenario, data]) => (
                        <div key={scenario} className="text-sm">
                          <p className="text-gray-600">
                            {scenarioNames[scenario]}
                          </p>
                          <p>
                            {data.value} ({data.probability}%)
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <TemplateDialog
        open={templateDialogOpen}
        onOpenChange={setTemplateDialogOpen}
        template={currentTemplate}
        onSave={onUpdateTemplate}
      />
    </div>
  )
}
