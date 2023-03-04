import { User } from '../types/user/user'
import { useQuery } from '@tanstack/react-query'

export const useCurrentUser = (): {
  user?: User
  loggedIn: boolean
  isLoading: boolean
} => {
  const { data, isLoading } = useQuery<User>(['me'])

  console.log(data)

  return {
    user: data,
    loggedIn: !!data?.id,
    isLoading,
  }
}
