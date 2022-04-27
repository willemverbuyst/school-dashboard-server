import { AxiosResponse } from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { axiosInstance, getJWTHeader } from '../../axiosInstance'
import { ApiUser } from '../../models/api/user.api'
import { queryKeys } from '../../react-query/constants'
import {
  getStoredUser,
  removeUserFromLocalstorage,
  setStoredUser,
} from '../../store/user'

interface UseUser {
  user: ApiUser | null
  updateUser: (user: ApiUser) => void
  removeUser: () => void
}

const getUser = async (user: ApiUser | null): Promise<ApiUser | null> => {
  if (!user) return null

  const { data }: AxiosResponse<ApiUser> = await axiosInstance.get(
    'auth/user',
    {
      headers: getJWTHeader(user),
    }
  )
  return data
}

export const useUser = (): UseUser => {
  const queryClient = useQueryClient()
  const { data: user } = useQuery(queryKeys.USER, () => getUser(user), {
    initialData: getStoredUser(),
    onSuccess: (received: ApiUser | null) => {
      if (!received) {
        removeUserFromLocalstorage()
      } else {
        setStoredUser(received)
      }
    },
  })

  const updateUser = (newUser: ApiUser): void => {
    queryClient.setQueryData(queryKeys.USER, newUser)
  }

  const removeUser = (): void => {
    queryClient.setQueryData(queryKeys.USER, null)
    queryClient.setQueriesData(queryKeys.STUDENT_SUBJECT, null)
    queryClient.setQueriesData(queryKeys.TEACHER_STUDENT, null)
    queryClient.setQueriesData(queryKeys.TEACHER_SUBJECT, null)
  }

  return { user, updateUser, removeUser }
}
