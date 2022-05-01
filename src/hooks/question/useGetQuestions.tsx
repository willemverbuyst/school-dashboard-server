import axios, { AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { axiosInstance, getJWTHeader } from '../../axiosInstance'
import { Toast } from '../../components/toast'
import { SERVER_ERROR } from '../../constants/constants'
import { ApiQuestion, Question } from '../../models'
import { ApiError } from '../../models/api/error.api'
import { ApiUser } from '../../models/api/user.api'
import { queryKeys } from '../../react-query/constants'
import { useUser } from '../auth/useUser'
import { filterBySubject } from './filterQuestions'

const getQuestions = async (
  user: ApiUser | null
): Promise<Array<Question> | null> => {
  try {
    if (!user) return null
    const { data }: AxiosResponse<ApiQuestion | ApiError> =
      await axiosInstance.get('/questions/', {
        headers: getJWTHeader(user),
      })

    if ('data' in data) return data.data

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

export const useGetQuestions = () => {
  const [filter, setFilter] = useState<string>('all')

  const selectFn = useCallback(
    (questions) => filterBySubject(questions, filter),
    [filter]
  )

  const { user } = useUser()
  const fallback = []
  const { data: questions = fallback } = useQuery(
    queryKeys.QUESTIONS,
    () => getQuestions(user),
    {
      select: filter === 'all' ? undefined : selectFn,
    }
  )

  return { questions, filter, setFilter }
}
