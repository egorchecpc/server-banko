import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

interface ModelSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onModelSelect: (model: string) => void
}

export const ModelSelectionModal: FC<ModelSelectionModalProps> = ({
  isOpen,
  onClose,
  onModelSelect,
}) => {
  const { t } = useTranslation()
  const [selectedModel, setSelectedModel] = useState<string>('Banko')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[25rem]">
        <DialogHeader>
          <DialogTitle>Выбор модели прогнозирования</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Select
            defaultValue="Banko"
            onValueChange={(value) => setSelectedModel(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите модель" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Banko">Модель Banko</SelectItem>
              <SelectItem value="2025">Модель за 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="w-full"
          >
            Отмена
          </Button>
          <Button
            onClick={() => onModelSelect(selectedModel)}
            variant="primary"
            className="w-full"
          >
            Готово
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
