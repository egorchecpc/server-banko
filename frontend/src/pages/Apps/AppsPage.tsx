import { HeaderModule } from '@/modules/HeaderModule/HeaderModule'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { RetailIcon } from './icons/retail'
import { CorpIcon } from '@/pages/Apps/icons/corp'
import { BankIcon } from '@/pages/Apps/icons/bank'
import { SuvIcon } from '@/pages/Apps/icons/suv'
import { ArrowIcon } from '@/pages/Apps/icons/arrow'

type DebtorType = 'retail' | 'corporate' | 'interbank' | 'sovereign'

export const AppsPage = () => {
  const [selectedType, setSelectedType] = useState<DebtorType | null>(null)
  const navigate = useNavigate()

  const handleContinue = () => {
    if (selectedType) {
      navigate({ to: '/reports', search: { type: selectedType } })
    }
  }

  const debtorTypes = [
    {
      id: 'retail',
      title: 'Розничный',
      icon: RetailIcon,
    },
    {
      id: 'corporate',
      title: 'Корпоративный',
      icon: CorpIcon,
    },
    {
      id: 'interbank',
      title: 'Межбанковский',
      icon: BankIcon,
    },
    {
      id: 'sovereign',
      title: 'Суверены',
      icon: SuvIcon,
    },
  ] as const

  return (
    <>
      <div className="flex w-full flex-col bg-grey-300/40">
        <HeaderModule
          withoutNav={true}
          withoutSidebar={true}
          withoutExportBtn={true}
          withLogo={true}
        />
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white px-12 py-9">
            <div className="mb-4 text-center text-[24px] font-semibold">
              Выберите тип должника
            </div>

            <div className="mb-6 grid grid-cols-2 gap-6">
              {debtorTypes.map((type) => (
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
                    onClick={() => setSelectedType(type.id)}
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
                onClick={handleContinue}
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
    </>
  )
}
