import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosConfigMock from '@/services/axiosConfigMock'
import { ProfileData } from '@/models/Profile'

export const useProfile = () => {
  const queryClient = useQueryClient()

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await axiosConfigMock.get<ProfileData>('/profile')
      return data
    },
  })

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (newProfile: Partial<ProfileData>) => {
      const { data } = await axiosConfigMock.put('/profile', newProfile)
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
