import axios, { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { axiosInstance, getJWTHeader } from '../../axiosInstance'
import { Toast } from '../../components/toast'
import { SERVER_ERROR } from '../../constants/constants'
import { ApiNewQuestion, NewQuestion, QuestionInput } from '../../models'
import { ApiError } from '../../models/api/error.api'
import { ApiUser } from '../../models/api/user.api'
import { queryKeys } from '../../react-query/constants'
import { useUser } from '../auth/useUser'

const postQuestion = async (
  newQuestion: NewQuestion,
  user: ApiUser | null
): Promise<ApiNewQuestion | null> => {
  try {
    if (!user) return null
    const { id } = newQuestion
    const { data }: AxiosResponse<ApiNewQuestion | ApiError> =
      await axiosInstance.post(`/questions/subjects/${id}`, newQuestion, {
        headers: getJWTHeader(user),
      })

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

const buildQuestionObject = ({
  subject,
  question,
  correctAnswer,
  wrongAnswer1,
  wrongAnswer2,
  wrongAnswer3,
}: QuestionInput): NewQuestion => ({
  id: subject,
  question,
  answer1text: correctAnswer,
  answer2text: wrongAnswer1,
  answer3text: wrongAnswer2,
  answer4text: wrongAnswer3,
  answer1bool: true,
  answer2bool: false,
  answer3bool: false,
  answer4bool: false,
})

export const usePostQuestion = () => {
  const { user } = useUser()
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (newQuestion: any) => postQuestion(buildQuestionObject(newQuestion), user),
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
