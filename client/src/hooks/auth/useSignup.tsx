import axios, { AxiosError, AxiosResponse } from 'axios'
import { axiosInstance } from '../../axiosInstance'
import { Toast } from '../../components/toast'
import { SERVER_ERROR } from '../../constants/constants'
import { ApiError } from '../../models/api/error.api'
import { ApiUser } from '../../models/api/user.api'
import { useUser } from './useUser'

export interface SignupInput {
  bio: string
  bsn: string
  email: string
  password: string
  role: string
  school: string
  teacher: string
  userName: string
}

export const useSignup = () => {
  const { updateUser } = useUser()
  const urlEndpoint = '/auth/signup'

  const authServerCall = async ({
    bio,
    bsn,
    email,
    password,
    role,
    school,
    teacher,
    userName,
  }: SignupInput): Promise<void> => {
    try {
      const { data, status }: AxiosResponse<ApiUser | ApiError> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: {
            bio,
            bsn,
            email,
            password,
            role,
            schoolId: school,
            teacherId: teacher,
            userName,
          },
          headers: { 'Content-Type': 'application/json' },
        })

      if (!status.toString().startsWith('2')) {
        const text =
          data && data.message ? data.message : 'Something went wrong'
        Toast({ text, status: 'warning' })
        return
      }

      if ('data' in data && 'token' in data && 'user' in data.data) {
        const text = data && data.message ? data.message : 'Welcome'
        Toast({ text, status: 'success' })
        updateUser(data)
      }
    } catch (errorResponse) {
      let errorMessage = SERVER_ERROR
      if (axios.isAxiosError(errorResponse)) {
        if (errorResponse.response && errorResponse.response.data) {
          const { message } = errorResponse.response.data as AxiosError
          if (message) errorMessage = message
        }
      }
      Toast({ text: errorMessage, status: 'error' })
    }
  }

  const signup = async (input: SignupInput): Promise<void> =>
    authServerCall(input)

  return { signup }
}
