import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import React from 'react'

interface DeleteTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  templateName: string
}

const DeleteTemplateDialogComponent: React.FC<DeleteTemplateDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  templateName,
}) => {
  const title = 'Удалить шаблон'
  const description = `Вы уверены, что хотите удалить шаблон "${templateName}"? Это действие нельзя отменить.`

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const DeleteTemplateDialog = React.memo(DeleteTemplateDialogComponent)
