export type FileStatus = 'idle' | 'uploading' | 'success' | 'error'
export type ReportType =
  | 'Розничный'
  | 'Корпоративный'
  | 'Межбанковский'
  | 'Суверены'

export interface FileState {
  progress: number
  status: FileStatus | null
  file: File | null
}

export interface FilesState {
  portfolio: FileState
  payments: FileState
  cashflow: FileState
  macro: FileState
}

export interface ReportDetails {
  name: string
  isPublic: boolean
  description: string
  type: ReportType | ''
}

export interface ReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ACCEPTED_FILE_TYPES = '.xlsx,.xls,.csv'

export const FILE_UPLOAD_CONFIG = {
  portfolio: {
    label: 'Кредитный портфель',
    required: true,
  },
  payments: {
    label: 'График платежей',
    required: true,
  },
  cashflow: {
    label: 'Денежный поток',
    required: true,
  },
  macro: {
    label: 'Макро данные',
    required: true,
  },
} as const

export const REPORT_TYPES = [
  { value: 'Розничный', label: 'Розничный' },
  { value: 'Корпоративный', label: 'Корпоративный' },
] as const
