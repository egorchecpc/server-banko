import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ChevronDown, ChevronRight, Edit } from 'lucide-react'
import { RModelSettingsModule } from '@/modules/ModelSettingsModule/ModelSettingsModule'
import {
  ContainerBody,
  ContainerComponent,
} from '@/components/ContainerComponent/ContainerComponent'

// Product types and their labels
const PRODUCT_TYPES = {
  consumer: 'Потребительский',
  mortgage: 'Ипотечный',
  overdraft: 'Овердрафт',
  cards: 'По кредитным картам',
}

// Overdue buckets
const OVERDUE_BUCKETS = ['0', '0-30', '30-60', '60-90']

interface ModelSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productType: string
  bucket: string
}

const ModelSettingsDialog: React.FC<ModelSettingsDialogProps> = ({
  open,
  onOpenChange,
  productType,
  bucket,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <RModelSettingsModule />
      </DialogContent>
    </Dialog>
  )
}

interface ProductBucketItemProps {
  productType: string
  bucket: string
  onEditClick: (productType: string, bucket: string) => void
}

const ProductBucketItem: React.FC<ProductBucketItemProps> = ({
  productType,
  bucket,
  onEditClick,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-8 py-2">
      <span className="text-sm">Просрочка {bucket} дней</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEditClick(productType, bucket)}
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  )
}

interface ProductTypeItemProps {
  productKey: string
  productLabel: string
  onEditClick: (productType: string, bucket: string) => void
}

const ProductTypeItem: React.FC<ProductTypeItemProps> = ({
  productKey,
  productLabel,
  onEditClick,
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mb-2 rounded-lg border border-gray-200">
      <div
        className="flex cursor-pointer items-center justify-between rounded-t-lg bg-gray-50 p-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          {expanded ? (
            <ChevronDown className="mr-2 h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="mr-2 h-5 w-5 text-gray-500" />
          )}
          <span className="font-medium">{productLabel}</span>
        </div>
      </div>

      {expanded && (
        <div className="py-1">
          {OVERDUE_BUCKETS.map((bucket) => (
            <ProductBucketItem
              key={`${productKey}-${bucket}`}
              productType={productKey}
              bucket={bucket}
              onEditClick={onEditClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const RModelSettingsPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedBucket, setSelectedBucket] = useState('')

  const handleEditClick = (productType: string, bucket: string) => {
    setSelectedProduct(productType)
    setSelectedBucket(bucket)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Настройка R-моделей</h2>
      <ContainerComponent
        withBg={true}
        title={'Виды продуктов и корзины просрочки'}
      >
        <ContainerBody isScrolling={false}>
          {Object.entries(PRODUCT_TYPES).map(([key, label]) => (
            <ProductTypeItem
              key={key}
              productKey={key}
              productLabel={label}
              onEditClick={handleEditClick}
            />
          ))}
        </ContainerBody>
      </ContainerComponent>

      <ModelSettingsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        productType={selectedProduct}
        bucket={selectedBucket}
      />
    </div>
  )
}
