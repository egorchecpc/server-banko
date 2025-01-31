import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Download as DownloadIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useCreditListFile } from '@/hooks/apiHooks/dashboardHooks/useCreditListFile'

const productTypes = ['Овердрафт', 'Ипотечный', 'Потребительский', 'Другие']

export const ExportCreditList: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([])
  const exportMutation = useCreditListFile()
  const handleExport = async () => {
    try {
      await exportMutation.mutateAsync()

      toast.success('Файл успешно экспортирован')
    } catch (error) {
      toast.error('Не удалось экспортировать файл' + error)
    }
  }
  const handleCheckboxChange = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
        ? prev.filter((item) => item !== product)
        : [...prev, product]
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="export" size="default" className="mb-3">
          <div className="flex items-center gap-1">
            <DownloadIcon className="h-4 w-4" />
            <div>Экспортировать</div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Выберите виды продуктов</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            {productTypes.map((product) => (
              <div key={product} className="flex items-center space-x-2">
                <Checkbox
                  id={product}
                  checked={selectedProducts.includes(product)}
                  onCheckedChange={() => handleCheckboxChange(product)}
                />
                <Label htmlFor={product}>{product}</Label>
              </div>
            ))}
          </div>
          <Button variant="primary" onClick={handleExport} className="mt-4">
            Экспортировать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
