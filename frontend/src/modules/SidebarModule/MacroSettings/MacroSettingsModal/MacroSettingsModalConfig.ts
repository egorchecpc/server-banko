import { z } from 'zod'
import { FieldErrors } from 'react-hook-form'
import { MacroSettings } from '@/models/MacroSettings'

export const macroSettingsSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1),
  values: z.record(
    z.string(),
    z
      .object({
        best: z.object({
          value: z.number().nonnegative().min(0),
          probability: z.number().min(0).max(100),
        }),
        normal: z.object({
          value: z.number().nonnegative().min(0),
          probability: z.number().min(0).max(100),
        }),
        worst: z.object({
          value: z.number().nonnegative().min(0),
          probability: z.number().min(0).max(100),
        }),
      })
      .refine((data) => {
        const totalProbability =
          data['worst'].probability +
          data['normal'].probability +
          data['best'].probability
        return totalProbability === 100
      })
  ),
})

export type MacroSettingsErrors = FieldErrors<MacroSettings>
