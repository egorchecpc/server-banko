import { MacroSettings } from '@/models/MacroSettings'
import { DebtorData } from '@/models/DebtorData'

export interface ProfileReportData {
  id: string
  date: string
  title: string
  owner: string
  status: 'В процессе проверки' | 'Завершён' | 'Отменён'
  priority: 'Важный' | 'Средний' | 'Низкий'
  label: 'Черновик' | 'Готово' | string
  RR: string
  ECL: string
  LGD: string
  PD: string
  macroData: MacroSettings
  debtorData: DebtorData
}
