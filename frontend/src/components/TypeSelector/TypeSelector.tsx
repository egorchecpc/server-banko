import { Check, LockIcon } from 'lucide-react'
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
  // Проверка доступности типа должника (только retail доступен)
  const isTypeAvailable = (type: DebtorType) => type === 'retail'

  // Обработчик клика по карточке
  const handleTypeClick = (type: DebtorType) => {
    if (isTypeAvailable(type)) {
      onTypeSelect(type)
    }
  }

  return (
    <div className="flex h-[110vh] min-h-screen w-full items-center justify-center text-black-1000">
      <div className="w-full max-w-xl rounded-2xl border border-grey-900/30 bg-white px-5 py-5 shadow-lg">
        <div className="mb-5 text-center text-2xl font-semibold">
          Выберите тип должника
        </div>

        <div className="mb-6 flex justify-center">
          <div className="grid w-3/4 grid-cols-2 gap-6">
            {options.map((type) => {
              const isAvailable = isTypeAvailable(type.id)

              return (
                <div
                  key={type.id}
                  className={`relative flex w-full flex-col rounded-2xl border-2 ${
                    selectedType === type.id
                      ? 'border-blue-1000'
                      : isAvailable
                        ? 'border-grey-900/30 hover:border-grey-900/60'
                        : 'border-grey-900/30'
                  }`}
                  style={{
                    userSelect: 'none',
                    pointerEvents: isAvailable ? 'auto' : 'none',
                  }}
                >
                  {selectedType === type.id && (
                    <div className="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-l-none rounded-r-xl rounded-bl-lg rounded-br-none bg-blue-1000">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}

                  {!isAvailable && (
                    <div className="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-l-none rounded-r-xl rounded-bl-lg rounded-br-none bg-gray-500">
                      <LockIcon className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div
                    onClick={() => handleTypeClick(type.id)}
                    className={`flex h-[11rem] items-center justify-center rounded-xl rounded-b-none p-4 transition-all ${
                      selectedType === type.id
                        ? 'border-blue-500 bg-blue-1000/30'
                        : isAvailable
                          ? 'cursor-pointer border-gray-200 bg-grey-900/25 hover:border-gray-300'
                          : 'cursor-not-allowed border-gray-200 bg-grey-900/10'
                    } `}
                  >
                    <div className="space-y-3">
                      <type.icon />
                    </div>
                  </div>
                  <div className="border-black-900 py-3 text-center text-md font-bold text-black-1000">
                    {type.title}
                    {!isAvailable && (
                      <div className="text-xs font-normal text-gray-500">
                        В разработке
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button
            variant="primary"
            onClick={onContinue}
            disabled={!selectedType}
            className="px-8 py-5 text-base"
          >
            <div className="flex items-center justify-center gap-2">
              <div>Далее</div>
              <ArrowIcon />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
