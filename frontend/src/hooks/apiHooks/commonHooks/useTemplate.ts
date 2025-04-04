import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MacroTemplate } from '@/models/MacroTemplate'
import axiosConfigMock from '@/services/axiosConfigMock'
import { API_ENDPOINTS } from '@/services/endpoints'

export const useTemplates = () => {
  const queryClient = useQueryClient()

  const { data: templates, isLoading: isTemplatesLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data } = await axiosConfigMock.get<MacroTemplate[]>(
        API_ENDPOINTS.COMMON.TEMPLATES.GET_ALL
      )
      return data
    },
  })

  const { mutate: updateTemplate } = useMutation({
    mutationFn: async (template: MacroTemplate) => {
      const { data } = await axiosConfigMock.put(
        API_ENDPOINTS.COMMON.TEMPLATES.UPDATE(template.id),
        template
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })

  const { mutate: deleteTemplate } = useMutation({
    mutationFn: async (templateId: string) => {
      const { data } = await axiosConfigMock.delete(
        API_ENDPOINTS.COMMON.TEMPLATES.DELETE(templateId)
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })

  return {
    templates,
    isTemplatesLoading,
    updateTemplate,
    deleteTemplate,
  }
}
