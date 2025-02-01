import { FC } from 'react'
import { useController, Control } from 'react-hook-form'
import { FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DebtorData } from '@/models/DebtorData'

interface CustomFormFieldProps {
  name: keyof DebtorData
  control: Control<DebtorData>
  fieldData: {
    title: string
    default: string
    items: string[]
  }
  onSubmit: (value: Partial<DebtorData>) => void
}

export const CustomFormField: FC<CustomFormFieldProps> = ({
  name,
  control,
  fieldData,
  onSubmit,
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: [] as string[],
  })

  const isMultiSelect = name === 'productType' || name === 'creditType'

  if (!isMultiSelect) {
    return (
      <FormItem className="mb-3">
        <FormLabel>{fieldData.title}</FormLabel>
        <Select
          disabled={name === 'debtorType'}
          value={
            typeof field.value === 'string'
              ? field.value
              : field.value?.toString() || 'default'
          }
          onValueChange={(value) => {
            field.onChange(value)
            onSubmit({ [name]: value })
          }}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  typeof field.value === 'string'
                    ? field.value
                    : field.value?.toString() || fieldData.default
                }
              />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="default" disabled>
              {fieldData.default}
            </SelectItem>
            {fieldData.items.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>
    )
  }

  const selectedValues = Array.isArray(field.value) ? field.value : []

  const toggleValue = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value]
    field.onChange(newValues)
    onSubmit({ [name]: newValues })
  }

  return (
    <FormItem className="mb-3">
      <FormLabel>{fieldData.title}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                'w-full justify-between',
                !selectedValues.length && 'text-muted-foreground'
              )}
            >
              {selectedValues.length === 0
                ? fieldData.default
                : `${selectedValues.length} выбрано`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[15rem] p-0" align="center">
          <ScrollArea className="max-h-[300px]">
            <div className="p-1">
              {fieldData.items.map((item) => (
                <div
                  key={item}
                  className={cn(
                    'hover:text-accent-foreground relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-grey-400',
                    selectedValues.includes(item) && 'bg-accent'
                  )}
                  onClick={() => toggleValue(item)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedValues.includes(item)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {item}
                </div>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      {selectedValues.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedValues.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="flex cursor-default items-center gap-1 hover:bg-grey-600"
            >
              {item}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleValue(item)
                }}
              />
            </Badge>
          ))}
        </div>
      )}
    </FormItem>
  )
}
