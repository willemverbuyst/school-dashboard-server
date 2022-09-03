import axios, { AxiosError, AxiosResponse } from 'axios'
import { axiosInstance } from '../../axiosInstance'
import { Toast } from '../../components/toast'
import { SERVER_ERROR } from '../../constants/constants'
import { ApiError } from '../../models/api/error.api'
import { ApiUser } from '../../models/api/user.api'
import { useUser } from './useUser'

export const useLogin = () => {
  const { updateUser } = useUser()

  const authServerCall = async (
    urlEndpoint: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const { data, status }: AxiosResponse<ApiUser | ApiError> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: { email, password },
          headers: { 'Content-Type': 'application/json' },
        })

      if (!status.toString().startsWith('2')) {
        const text = data && data.message ? data.message : 'Unauthorized'
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

  const login = async (email: string, password: string): Promise<void> =>
    authServerCall('/auth/login', email, password)

  return login
}
