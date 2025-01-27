import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MacroTemplate } from '@/models/MacroTemplate'
import axiosConfig from '@/services/axiosConfig'

export const useTemplates = () => {
  const queryClient = useQueryClient()

  const { data: templates, isLoading: isTemplatesLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data } = await axiosConfig.get<MacroTemplate[]>('/templates')
      return data
    },
  })

  const { mutate: updateTemplate } = useMutation({
    mutationFn: async (template: MacroTemplate) => {
      console.log(template)
      const { data } = await axiosConfig.put(
        `/templates/${template.id}`,
        template
      )
      return data
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ['templates'] })
        .then((r) => console.log(r))
    },
  })

  return {
    templates,
    isTemplatesLoading,
    updateTemplate,
  }
}
