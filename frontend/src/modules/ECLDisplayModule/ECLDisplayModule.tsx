import { FC } from 'react'
import {
  ContainerBody,
  ContainerComponent,
} from '@/components/ContainerComponent/ContainerComponent'
import ECLTable from '@/components/Tables/ECLTable/ECLTable'
import { ECLData } from '@/models/ECL'

interface ECLDisplayModuleProps {
  eclDataV1: ECLData
  eclDataV2: ECLData
}
const ECLDisplayModule: FC<ECLDisplayModuleProps> = ({
  eclDataV1,
  eclDataV2,
}) => {
  return (
    <ContainerComponent withBg={false}>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <ECLTable data={eclDataV1} />
      </ContainerBody>
      <div className="my-8">
        Анализ кредитного качества по состоянию на __ ОТЧЕТНАЯ ДАТА__{' '}
      </div>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <ECLTable data={eclDataV2} />
      </ContainerBody>
    </ContainerComponent>
  )
}

export default ECLDisplayModule
