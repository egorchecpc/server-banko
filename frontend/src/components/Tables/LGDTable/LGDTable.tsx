import { FC, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
  ContainerBody,
  ContainerComponent,
} from '@/components/ContainerComponent/ContainerComponent'
import { LGDItem } from '@/models/LGD'

interface LGDTableProps {
  data: LGDItem[]
}

const LGDTable: FC<LGDTableProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [isEndOpen, setIsEndOpen] = useState(false)

  return (
    <ContainerComponent withBg={true}>
      <div className="mb-2 flex items-center justify-between">
        <div className="my-2 ml-4 flex items-center">
          <div className="text-xl font-bold leading-24 text-black-800">
            Убыток в случае дефолта (LGD)
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="startDate" className="text-sm font-medium">
              с:
            </Label>
            <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-36 justify-start pl-3">
                  {startDate ? (
                    format(startDate, 'd MMMM yyyy', { locale: ru })
                  ) : (
                    <span className="text-muted-foreground">Выберите дату</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="center">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  locale={ru}
                  fromYear={1900}
                  toYear={2030}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="endDate" className="text-sm font-medium">
              по:
            </Label>
            <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-36 justify-start pl-3">
                  {endDate ? (
                    format(endDate, 'd MMMM yyyy', { locale: ru })
                  ) : (
                    <span className="text-muted-foreground">Выберите дату</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="center">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  locale={ru}
                  fromYear={1900}
                  toYear={2030}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <ContainerBody isScrolling={true} orientation="horizontal">
        <Table className="table-auto border border-gray-200 bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="bg-muted border text-left">
                Нахождение в дефолте
              </TableHead>
              <TableHead className="bg-muted border text-center">
                1 кв 2023
              </TableHead>
              <TableHead className="bg-muted border text-center">
                2 кв 2023
              </TableHead>
              <TableHead className="bg-muted border text-center">
                3 кв 2023
              </TableHead>
              <TableHead className="bg-muted border text-center">
                4 кв 2023
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-y-0">
                <TableCell className="border-x text-left font-medium">
                  {row.category}
                </TableCell>
                {row.quarters.map((value, colIndex) => (
                  <TableCell key={colIndex} className="border-x text-center">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ContainerBody>
    </ContainerComponent>
  )
}

export default LGDTable
