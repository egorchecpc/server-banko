import { FC } from 'react'
import { useController, Control } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormItem, FormLabel, FormControl } from '@/components/ui/form'
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
  })

  return (
    <FormItem className="mb-3">
      <FormLabel>{fieldData.title}</FormLabel>
      <Select
        disabled={name == 'debtorType'}
        value={
          typeof field.value === 'string'
            ? field.value
            : field.value?.toISOString() || 'default'
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
                  : field.value?.toISOString() || fieldData.default
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
