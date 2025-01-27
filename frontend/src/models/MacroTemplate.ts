import { MacroSettings } from '@/models/MacroSettings'

export interface MacroTemplate {
  id: string
  name: string
  indicators: MacroSettings[]
}
