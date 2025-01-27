import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosConfig from '@/services/axiosConfig'
import { ProfileData } from '@/models/Profile'

export const useProfile = () => {
  const queryClient = useQueryClient()

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await axiosConfig.get<ProfileData>('/profile')
      return data
    },
  })

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (newProfile: Partial<ProfileData>) => {
      const { data } = await axiosConfig.put('/profile', newProfile)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return {
    profile,
    isProfileLoading,
    updateProfile,
  }
}
