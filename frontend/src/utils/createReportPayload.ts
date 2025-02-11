import { FormatedMacroSettings } from '@/models/FormatedMacroSettings'

export interface CreateReportPayload {
  id: string
  date: string
  title: string
  owner: string
  status: string
  priority: string
  label: string
  macroData: FormatedMacroSettings
  debtorData: {
    debtorType: string
    creditType: string
    productType: string
    date: string
  }
  isPublic: boolean
  description: string
}

export const createReportPayload = ({
  name,
  type,
  isPublic,
  description,
}: {
  name: string
  type: string
  isPublic: boolean
  description: string
}): CreateReportPayload => ({
  id: crypto.randomUUID(),
  date: new Date().toLocaleDateString('ru-RU'),
  title: name,
  owner: 'Риск-менеджер 1',
  status: 'В процессе проверки',
  priority: 'Важный',
  label: 'Черновик',
  macroData: {},
  debtorData: {
    debtorType: type,
    creditType: '',
    productType: '',
    date: '01.01.2025',
  },
  isPublic,
  description,
})
