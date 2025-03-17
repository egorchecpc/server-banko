import React, { useState } from 'react'
import { AlertCircle, Download, MessageCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ChartControlsProps {
  chartDescription: string
  onDownload?: () => void
}

const ChartControls: React.FC<ChartControlsProps> = ({
  chartDescription,
  onDownload = () =>
    console.log('Download functionality will be implemented later'),
}) => {
  const [comment, setComment] = useState<string>('')
  const [savedComment, setSavedComment] = useState<string>('')
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState<boolean>(false)

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setSavedComment(comment)
      setComment('')
      setIsCommentDialogOpen(false)
    }
  }

  return (
    <div className="flex items-center gap-0">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full p-1"
            >
              <AlertCircle className="h-5 w-5 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="max-w-md rounded-md border border-gray-200 bg-white p-4 shadow-md"
          >
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-black-1000">
                Описание графика
              </h4>
              <p className="text-sm text-gray-600">{chartDescription}</p>

              {savedComment && (
                <div className="mt-2 border-t pt-2">
                  <h4 className="text-sm font-semibold text-blue-600">
                    Комментарий
                  </h4>
                  <p className="rounded bg-blue-50 p-2 text-sm italic text-black-1000">
                    {savedComment}
                  </p>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full p-1"
        onClick={onDownload}
      >
        <Download className="h-5 w-5 text-gray-600" />
      </Button>

      <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full p-1"
          >
            <MessageCircle className="h-5 w-5 text-gray-600" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить комментарий</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-3">
            <Textarea
              placeholder="Введите комментарий к графику..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-24"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCommentDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={handleCommentSubmit}
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ChartControls
