import { FC, useState } from 'react'
import {
  ContainerBody,
  ContainerComponent,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import ECLTable from '@/components/Tables/ECLTable/ECLTable'
import { ECLData } from '@/models/ECL'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GearIcon } from '@radix-ui/react-icons'
import { Switch } from '@/components/ui/switch'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

interface ECLDisplayModuleProps {
  eclDataV1: ECLData
  eclDataV2: ECLData
  reportId: string
}
const ECLDisplayModule: FC<ECLDisplayModuleProps> = ({
  eclDataV1,
  eclDataV2,
  reportId,
}) => {
  const [showDelta, setShowDelta] = useState(false)

  const queryClient = useQueryClient()
  const { data: eclDiff1 } = useQuery({
    queryKey: ['eclDiff1'],
    queryFn: () => queryClient.getQueryData(['eclDiff1']),
    enabled: !!queryClient.getQueryData(['eclDiff1']),
  })
  const { data: eclDiff2 } = useQuery({
    queryKey: ['eclDiff2'],
    queryFn: () => queryClient.getQueryData(['eclDiff2']),
    enabled: !!queryClient.getQueryData(['eclDiff2']),
  })

  const handleSwitchChange = () => {
    setShowDelta((prevShowDelta) => !prevShowDelta)
    toast.info(
      'Обратите внимание, что для отображения ECL разниц, необходимо ввести новые макропоказатели.'
    )
  }

  return (
    <ContainerComponent withBg={true}>
      <ContainerHeader>
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            <div className="text-xl font-bold leading-24 text-black-800">
              Ожидаемые кредитные убытки (ОКУ, ECL)
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="!ring-none rounded-full p-1 hover:bg-gray-200">
                  <GearIcon />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="flex items-center gap-2 p-2"
              >
                <div className="text-[14px]">Отображение разниц</div>
                <Switch
                  checked={showDelta}
                  onCheckedChange={handleSwitchChange}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Link to={`/reports/${reportId}/credit-list`}>
              <p className="mr-4 bg-transparent text-[14px] text-blue-900 hover:text-charts-60">
                См. все кредиты
              </p>
            </Link>
          </div>
        </div>
      </ContainerHeader>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <ECLTable
          data={eclDataV1}
          isFirst={true}
          eclDiff={eclDiff1 as ECLData}
          showDelta={showDelta}
        />
      </ContainerBody>
      <div className="my-4"></div>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <ECLTable
          data={eclDataV2}
          isFirst={false}
          eclDiff={eclDiff2 as ECLData}
          showDelta={showDelta}
        />
      </ContainerBody>
    </ContainerComponent>
  )
}

export default ECLDisplayModule
