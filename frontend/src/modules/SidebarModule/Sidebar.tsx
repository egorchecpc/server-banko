import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { DebtorForm } from '@/modules/SidebarModule/DebtorForm/DebtorForm'
import { MacroSettingsComponent } from '@/modules/SidebarModule/MacroSettings/MacroSettings'
import React, { FC, useState } from 'react'
import { FormData } from '@/models/FormData'
import { MacroSettings } from '@/models/MacroSettings'
import { getYearArray } from '@/utils/getDate'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SidebarProps {
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppSidebar: FC<SidebarProps> = ({
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const [debtorData, setDebtorData] = useState<FormData | null>(null)
  const [macroData, setMacroData] = useState<MacroSettings[]>([])

  const postSettings = (
    debtorData: FormData | null,
    macroData: MacroSettings[]
  ) => {
    return function () {
      console.log('Форма: ', debtorData)
      console.log('Макро: ', macroData)
    }
  }
  const years = getYearArray(true, true, 3)

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <ScrollArea>
          <div className="flex h-full flex-col items-center p-5">
            <h2 className="pb-10 pt-8 text-2xl font-extrabold leading-9 text-blue-900">
              ЛОГО
            </h2>

            <div className="w-full overflow-y-auto overflow-x-hidden">
              <div className="rounded-lg bg-white p-4">
                <DebtorForm setDebtorData={setDebtorData} />
              </div>
              <MacroSettingsComponent
                postSettings={postSettings(debtorData, macroData)}
                setMacroData={setMacroData}
                years={years}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
              />
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}