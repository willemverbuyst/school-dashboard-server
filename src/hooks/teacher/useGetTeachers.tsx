import axios, { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { axiosInstance } from '../../axiosInstance'
import { Toast } from '../../components/toast'
import { SERVER_ERROR } from '../../constants/constants'
import { ApiError } from '../../models/api/error.api'
import { ApiTeacher } from '../../models/api/teacher/teacher.api'
import { queryKeys } from '../../react-query/constants'

export const getTeachers = async (): Promise<ApiTeacher | null> => {
  try {
    const { data }: AxiosResponse<ApiTeacher | ApiError> =
      await axiosInstance.get('/teachers')

    if ('data' in data) return data

    const text = data.message
    Toast({ text, status: 'error' })
    return null
  } catch (errorResponse) {
    const text =
      axios.isAxiosError(errorResponse) &&
      errorResponse?.response?.data?.message
        ? errorResponse?.response?.data?.message
        : SERVER_ERROR
    Toast({ text, status: 'error' })
    return null
  }
}

export const useGetTeachers = () => {
  const { data } = useQuery(queryKeys.TEACHERS, getTeachers)

  const teachers = data ? data.data : []

  return teachers
}
