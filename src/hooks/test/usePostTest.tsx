import axios, { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { axiosInstance, getJWTHeader } from '../../axiosInstance'
import { Toast } from '../../components/toast'
import { SERVER_ERROR } from '../../constants/constants'
import { ApiNewTest, NewTest, TestInput } from '../../models'
import { ApiError } from '../../models/api/error.api'
import { ApiUser } from '../../models/api/user.api'
import { queryKeys } from '../../react-query/constants'
import { useUser } from '../auth/useUser'

const postTest = async (
  test: NewTest,
  user: ApiUser | null
): Promise<ApiNewTest | null> => {
  try {
    if (!user) return null

    const { subjectId, ...input } = test

    const { data }: AxiosResponse<ApiNewTest | ApiError> =
      await axiosInstance.post(`/test/subjects/${subjectId}`, input, {
        headers: getJWTHeader(user),
      })

    const text = data.message
    Toast({ text, status: 'success' })
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

const buildTestObject = (input: TestInput): NewTest => {
  let testObject = {} as NewTest
  Object.entries(input.test).forEach(([key, value], i) => {
    const k = `answer${i}`
    const v = `question${i}`
    testObject[k] = key
    testObject[v] = value
  })
  testObject.studentId = input.studentId
  testObject.subjectId = input.subjectId

  return testObject
}

export const usePostTest = () => {
  const { user } = useUser()
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (newTest: TestInput) => postTest(buildTestObject(newTest), user),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.QUESTIONS])
        const text = 'You have added a question'
        Toast({ text, status: 'success' })
      },
    }
  )

  return mutate
}
