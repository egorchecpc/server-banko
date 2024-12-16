import React, { FC, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'

interface ChartModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const ChartModal: FC<ChartModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.pointerEvents = ''
    } else {
      document.body.style.pointerEvents = 'auto'
    }

    return () => {
      document.body.style.pointerEvents = 'auto'
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[90vh] max-w-7xl">
        <DialogHeader>
          <DialogTitle>Графическое отображение</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="overflow-auto">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default ChartModal
