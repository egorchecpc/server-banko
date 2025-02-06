import React, { FC, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CustomFormField } from './CustomFormField/CustomFormField'
import { useTranslation } from 'react-i18next'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DebtorData } from '@/models/DebtorData'
import { useParams } from '@tanstack/react-router'
import { useGetDebtorDataById } from '@/hooks/apiHooks/commonHooks/useGetReportsData'

interface DebtorFormProps {
  setDebtorData: React.Dispatch<React.SetStateAction<DebtorData | undefined>>
}

export const DebtorForm: FC<DebtorFormProps> = ({ setDebtorData }) => {
  const { reportId } = useParams({ strict: false })
  const { debtorData } = useGetDebtorDataById(reportId ? reportId : '')

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const { t } = useTranslation()

  const parseInitialData = () => {
    if (!debtorData) return undefined
    return debtorData
  }

  const form = useForm<DebtorData>({
    defaultValues: parseInitialData() || {
      debtorType: 'default',
      creditType: [],
      productType: [],
      date: undefined,
    },
  })

  useEffect(() => {
    if (debtorData) {
      setDebtorData(debtorData)
      Object.keys(debtorData).forEach((key) => {
        form.setValue(
          key as keyof DebtorData,
          debtorData[key as keyof DebtorData]
        )
      })
    }
  }, [debtorData])

  const debtorType = {
    title: t('sidebar.debtorForm.debtorType.title'),
    default: t('sidebar.debtorForm.debtorType.default'),
    items: [
      t('sidebar.debtorForm.debtorType.items.item1'),
      t('sidebar.debtorForm.debtorType.items.item2'),
    ],
  }

  const creditType = {
    title: t('sidebar.debtorForm.creditType.title'),
    default: t('sidebar.debtorForm.creditType.default'),
    items: [
      t('sidebar.debtorForm.creditType.items.item1'),
      t('sidebar.debtorForm.creditType.items.item2'),
      t('sidebar.debtorForm.creditType.items.item3'),
    ],
  }

  const getProductTypeItems = () => {
    const selectedCreditTypes = form.watch('creditType') || []
    let availableProducts: string[] = []

    if (
      selectedCreditTypes.includes(
        t('sidebar.debtorForm.creditType.items.item1')
      )
    ) {
      availableProducts = [
        ...availableProducts,
        t('sidebar.debtorForm.productType.items.consumer1'),
        t('sidebar.debtorForm.productType.items.consumer2'),
      ]
    }

    if (
      selectedCreditTypes.includes(
        t('sidebar.debtorForm.creditType.items.item2')
      )
    ) {
      availableProducts = [
        ...availableProducts,
        t('sidebar.debtorForm.productType.items.mortgage1'),
        t('sidebar.debtorForm.productType.items.mortgage2'),
      ]
    }

    if (
      selectedCreditTypes.includes(
        t('sidebar.debtorForm.creditType.items.item3')
      )
    ) {
      availableProducts = [
        ...availableProducts,
        t('sidebar.debtorForm.productType.items.overdraft1'),
        t('sidebar.debtorForm.productType.items.overdraft2'),
      ]
    }

    return availableProducts
  }

  const productType = {
    title: t('sidebar.debtorForm.productType.title'),
    default: t('sidebar.debtorForm.productType.default'),
    items: getProductTypeItems(),
  }

  useEffect(() => {
    const currentProductTypes = form.watch('productType') || []
    const availableProducts = getProductTypeItems()

    const validProductTypes = currentProductTypes.filter((product) =>
      availableProducts.includes(product)
    )

    form.setValue('productType', validProductTypes)
    onSubmit(form.getValues())
  }, [form.watch('creditType')])

  const onSubmit = (data: DebtorData) => {
    setDebtorData(data)
  }

  const handleDateSelect = (
    date: Date | undefined,
    field: {
      onChange: (value?: Date) => void
      value: Date | undefined
    }
  ) => {
    field.onChange(date)
    setIsCalendarOpen(false)
    onSubmit({ ...form.getValues(), date })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
        <CustomFormField
          name="debtorType"
          control={form.control}
          fieldData={debtorType}
          onSubmit={(value) =>
            onSubmit({ ...form.getValues(), debtorType: value.debtorType })
          }
        />

        <CustomFormField
          name="creditType"
          control={form.control}
          fieldData={creditType}
          onSubmit={(value) =>
            onSubmit({ ...form.getValues(), creditType: value.creditType })
          }
        />

        <CustomFormField
          name="productType"
          control={form.control}
          fieldData={productType}
          onSubmit={(value) =>
            onSubmit({ ...form.getValues(), productType: value.productType })
          }
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('sidebar.debtorForm.date.title')}</FormLabel>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn('w-full pl-3 text-left font-normal')}
                    >
                      {field.value ? (
                        format(field.value, 'd MMMM yyyy', { locale: ru })
                      ) : (
                        <span>{t('sidebar.debtorForm.date.default')}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent
                  side="bottom"
                  align="start"
                  className="mx-auto w-full p-0"
                >
                  <Calendar
                    mode="single"
                    locale={ru}
                    captionLayout="dropdown-buttons"
                    selected={field.value}
                    onSelect={(date) => handleDateSelect(date, field)}
                    fromYear={1960}
                    toYear={2030}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
