import { Upload, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { ACCEPTED_FILE_TYPES, FilesState } from '../ImportModalModuleConfig'

interface FileUploadButtonProps {
  type: keyof FilesState
  label: string
  files: FilesState
  onFileChange: (type: keyof FilesState, file: File | null) => Promise<void>
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  type,
  label,
  files,
  onFileChange,
}) => (
  <div className="mb-4">
    <div className="flex items-center gap-4">
      <label className="flex-1">
        <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
          <Upload className="h-5 w-5" />
          <span className="flex-1">{label}</span>
          {files[type].status === 'error' && (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          )}
          {files[type].status === 'success' && (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          )}
        </div>
        <input
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          className="hidden"
          onChange={(e) => onFileChange(type, e.target.files?.[0] || null)}
        />
      </label>
    </div>
    {files[type].progress > 0 && files[type].progress < 100 && (
      <div className="mt-2">
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all"
            style={{ width: `${files[type].progress}%` }}
          />
        </div>
      </div>
    )}
  </div>
)
