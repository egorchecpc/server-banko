import {
  ContainerBody,
  ContainerComponent,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import PCureTable from '@/components/Tables/PCureTable/PCureTable'
import PRateTable from '@/components/Tables/PRateTable/PRateTable'

const PCureDisplayModule = () => {
  return (
    <ContainerComponent withBg={true}>
      <ContainerHeader>
        <div className="my-1 flex items-center">
          <div className="leading-16 text-md font-bold text-black-800">
            Вероятность выздоровления (p_qure)
          </div>
        </div>
      </ContainerHeader>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <PCureTable />
      </ContainerBody>
      <ContainerHeader>
        <div className="my-1 flex items-center">
          <div className="leading-16 text-md font-bold text-black-800">
            Коэффициент досрочного погашения (PR, prepayment rate)
          </div>
        </div>
      </ContainerHeader>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <PRateTable />
      </ContainerBody>
    </ContainerComponent>
  )
}

export default PCureDisplayModule
