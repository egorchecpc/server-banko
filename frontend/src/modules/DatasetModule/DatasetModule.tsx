import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArrowIcon } from '@/components/TypeSelector/arrow'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useFileUpload } from '@/hooks/useFileUpload'
import { FileUploadButton } from '@/modules/ImportModalModule/FileUploadBtn/FileUploadBtn'

// Тип для описания датасета
interface Dataset {
  id: string
  name: string
  date: string
}

// Типы из оригинального компонента
export type FileStatus = 'idle' | 'uploading' | 'success' | 'error'

export interface FileState {
  progress: number
  status: FileStatus | null
  file: File | null
}

export interface FilesState {
  portfolio: FileState
  payments: FileState
  cashflow: FileState
  macro: FileState
}

export const ACCEPTED_FILE_TYPES = '.xlsx,.xls,.csv'

export const FILE_UPLOAD_CONFIG = {
  portfolio: {
    label: 'Кредитный портфель',
    required: true,
  },
  payments: {
    label: 'График платежей',
    required: true,
  },
  cashflow: {
    label: 'Денежный поток',
    required: true,
  },
  macro: {
    label: 'Макро данные',
    required: true,
  },
} as const

interface DatasetSelectorProps {
  currentDataset: Dataset
  onContinue: () => void
  type: string
  onDatasetUpdate?: (dataset: Dataset) => void // Добавлен новый проп для обновления датасета
}

const debtorTypeHelper = {
  retail: 'розничный',
  corporate: 'корпоративный',
  interbank: 'межбанковский',
  sovereign: 'суверенный',
}

export const DatasetModule: React.FC<DatasetSelectorProps> = ({
  currentDataset,
  onContinue,
  type,
  onDatasetUpdate,
}) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const { files, handleFileChange, isAllFilesUploaded } = useFileUpload()

  // Обработчик загрузки дополнительных данных
  const handleUploadAdditionalData = () => {
    if (isAllFilesUploaded) {
      // Формируем текущую дату в формате DD.MM.YYYY
      const now = new Date()
      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = now.getFullYear()
      const formattedDate = `${day}.${month}.${year}`

      // Создаем обновленный датасет с текущей датой
      const updatedDataset = {
        ...currentDataset,
        date: formattedDate,
        id: `ds-${year}-${month}-${day}-${Math.floor(Math.random() * 1000000)}`, // Генерируем новый ID с текущей датой
      }

      // Вызываем функцию обновления датасета, если она предоставлена
      if (onDatasetUpdate) {
        onDatasetUpdate(updatedDataset)
      }

      // Логика для обработки загруженных файлов
      toast.success('Дополнительные данные успешно загружены')
      setIsUploadDialogOpen(false)
    } else {
      toast.error('Пожалуйста, загрузите все необходимые файлы')
    }
  }

  return (
    <div className="flex h-[110vh] min-h-screen w-full items-center justify-center text-black-1000">
      <div className="w-full max-w-xl rounded-2xl border border-grey-900/30 bg-white px-5 py-5 shadow-lg">
        <div className="mb-5 text-center text-2xl font-semibold">
          Текущий {debtorTypeHelper[type]} датасет
        </div>

        <div className="mb-8">
          <div className="rounded-lg border border-grey-900/30 p-6">
            <div className="mb-2 text-lg font-medium">
              {currentDataset.name}
            </div>
            <div className="text-sm text-gray-500">
              Дата создания: {currentDataset.date}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button
            variant="secondary"
            onClick={() => setIsUploadDialogOpen(true)}
            className="px-6 py-4 text-base"
          >
            <div className="flex items-center justify-center gap-2">
              <Upload className="h-4 w-4" />
              <div>Загрузить данные</div>
            </div>
          </Button>

          <Button
            variant="primary"
            onClick={onContinue}
            className="px-6 py-4 text-base"
          >
            <div className="flex items-center justify-center gap-2">
              <div>Продолжить</div>
              <ArrowIcon />
            </div>
          </Button>
        </div>
      </div>

      {/* Диалоговое окно для дозагрузки файлов - идентичное оригинальному компоненту */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Загрузка файлов</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {Object.entries(FILE_UPLOAD_CONFIG).map(([type, config]) => (
              <FileUploadButton
                key={type}
                type={type as keyof FilesState}
                label={config.label}
                files={files}
                onFileChange={handleFileChange}
              />
            ))}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsUploadDialogOpen(false)}
              >
                Отмена
              </Button>
              <Button
                disabled={!isAllFilesUploaded}
                variant="primary"
                onClick={handleUploadAdditionalData}
              >
                Загрузить данные
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
