import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArrowIcon } from '@/components/TypeSelector/arrow'

export type DebtorType =
  | 'retail'
  | 'corporate'
  | 'interbank'
  | 'sovereign'
  | 'consumer'
  | 'mortgage'
  | 'overdraft'
  | 'cards'

export interface DebtorTypeOption {
  id: DebtorType
  title: string
  icon: React.FC
}

interface DebtorTypeSelectorProps {
  selectedType: DebtorType | null
  onTypeSelect: (type: DebtorType) => void
  onContinue: () => void
  options: DebtorTypeOption[]
}

export const DebtorTypeSelector: React.FC<DebtorTypeSelectorProps> = ({
  selectedType,
  onTypeSelect,
  onContinue,
  options,
}) => {
  return (
    <div className="flex h-[112vh] w-full flex-col">
      <div className="mt-24 flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white px-12 py-7">
          <div className="mb-4 text-center text-[24px] font-semibold">
            Выберите вид кредита
          </div>

          <div className="mb-6 grid grid-cols-2 gap-6">
            {options.map((type) => (
              <div
                key={type.id}
                className={`relative flex w-full flex-col rounded-2xl border-2 ${
                  selectedType === type.id
                    ? 'border-blue-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {selectedType === type.id && (
                  <div className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-l-none rounded-r-xl rounded-bl-lg rounded-br-none bg-blue-500">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  onClick={() => onTypeSelect(type.id)}
                  className={`flex h-[10rem] cursor-pointer items-center justify-center rounded-2xl rounded-b-none p-4 transition-all ${
                    selectedType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-grey-100 hover:border-gray-300'
                  } `}
                >
                  <div className="space-y-2">
                    <type.icon />
                  </div>
                </div>
                <div className="border-black-900 py-3 text-center text-sm font-bold text-gray-700">
                  {type.title}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={onContinue}
              disabled={!selectedType}
              className="px-8"
            >
              <div className="flex items-center justify-center gap-3">
                <div>Далее</div>
                <ArrowIcon />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
