import { FC } from 'react'
import {
  ContainerBody,
  ContainerComponent,
} from '@/components/ContainerComponent/ContainerComponent'
import ECLTable from '@/components/Tables/ECLTable/ECLTable'
import { ECLData } from '@/models/ECL'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface ECLDisplayModuleProps {
  eclDataV1: ECLData
  eclDataV2: ECLData
}
const ECLDisplayModule: FC<ECLDisplayModuleProps> = ({
  eclDataV1,
  eclDataV2,
}) => {
  const queryClient = useQueryClient()
  const { data: eclDiff1 } = useQuery({
    queryKey: ['eclDiff'],
    queryFn: () => queryClient.getQueryData(['eclDiff1']),
    enabled: !!queryClient.getQueryData(['eclDiff1']),
  })
  const { data: eclDiff2 } = useQuery({
    queryKey: ['eclDiff'],
    queryFn: () => queryClient.getQueryData(['eclDiff2']),
    enabled: !!queryClient.getQueryData(['eclDiff2']),
  })
  return (
    <ContainerComponent withBg={false}>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <ECLTable
          data={eclDataV1}
          isFirst={true}
          eclDiff={eclDiff1 as ECLData}
        />
      </ContainerBody>
      <div className="my-4"></div>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <ECLTable
          data={eclDataV2}
          isFirst={false}
          eclDiff={eclDiff2 as ECLData}
        />
      </ContainerBody>
    </ContainerComponent>
  )
}

export default ECLDisplayModule
