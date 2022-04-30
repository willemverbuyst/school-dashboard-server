import axios, { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { axiosInstance } from '../../axiosInstance'
import { Toast } from '../../components/toast'
import { SERVER_ERROR } from '../../constants/constants'
import { ApiError } from '../../models/api/error.api'
import { ApiSchool } from '../../models/schools.models'
import { queryKeys } from '../../react-query/constants'

export const getSchools = async (): Promise<ApiSchool | null> => {
  try {
    const { data }: AxiosResponse<ApiSchool | ApiError> =
      await axiosInstance.get('/schools')

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

export const useGetSchools = () => {
  const { data } = useQuery(queryKeys.SCHOOLS, getSchools)

  const schools = data ? data.data : []

  return schools
}
