import axios, { AxiosResponse } from 'axios'
import { axiosInstance } from '../../axiosInstance'
import { Toast } from '../../components/toast'
import { SERVER_ERROR } from '../../constants/constants'
import { ApiLogout } from '../../models/api/auth/logout.api'
import { ApiError } from '../../models/api/error.api'
import { useUser } from './useUser'

const getLogout = async (): Promise<void> => {
  try {
    const { data }: AxiosResponse<ApiLogout | ApiError> =
      await axiosInstance.get('/auth/logout')

    const text = data.message

    Toast({ text, status: 'success' })
  } catch (errorResponse) {
    const text =
      axios.isAxiosError(errorResponse) &&
      errorResponse?.response?.data?.message
        ? errorResponse?.response?.data?.message
        : SERVER_ERROR
    Toast({ text, status: 'error' })
  }
}

export const useLogout = () => {
  const { removeUser } = useUser()

  const logout = async (): Promise<void> => {
    removeUser()
    await getLogout()
  }

  return logout
}
