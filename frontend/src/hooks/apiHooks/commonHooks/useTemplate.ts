import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MacroTemplate } from '@/models/MacroTemplate'
import axiosConfig from '@/services/axiosConfig'
import axios from 'axios'

export const useTemplates = () => {
  const queryClient = useQueryClient()

  const { data: templates, isLoading: isTemplatesLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data } = await axios.get<MacroTemplate[]>(
        'https://banko-backend.stacklevel.group/templates'
      )
      return data
    },
  })

  const { mutate: updateTemplate } = useMutation({
    mutationFn: async (template: MacroTemplate) => {
      const { data } = await axios.put(
        `https://banko-backend.stacklevel.group/templates/${template.id}`,
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
      const { data } = await axios.delete(
        `https://banko-backend.stacklevel.group/templates/${templateId}`
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
