import {
  ContainerBody,
  ContainerComponent,
  ContainerHeader,
} from '@/components/ContainerComponent/ContainerComponent'
import PCureTable from '@/components/Tables/PCureTable/PCureTable'
import PRateTable from '@/components/Tables/PRateTable/PRateTable'

const PCureDisplayModule = () => {
  return (
    <div className="my-3">
      <ContainerComponent withBg={true}>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
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
          </div>

          <div className="w-1/2">
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
          </div>
        </div>
      </ContainerComponent>
    </div>
  )
}

export default PCureDisplayModule
