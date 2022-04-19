import { useMutation, useQueryClient } from 'react-query'
import { axiosInstance, getJWTHeader } from '../../axiosInstance'
import { Toast } from '../../components/toast'
import { ApiUser } from '../../models/api/user.api'
import { queryKeys } from '../../react-query/constants'
import { useUser } from '../auth/useUser'

interface NewQuestion {
	id: string
	question: string
	answer1text: string
	answer2text: string
	answer3text: string
	answer4text: string
	answer1bool: boolean
	answer2bool: boolean
	answer3bool: boolean
	answer4bool: boolean
}

export interface QuestionInput {
	subject: string
	question: string
	correctAnswer: string
	wrongAnswer1: string
	wrongAnswer2: string
	wrongAnswer3: string
}

const postQuestion = async (newQuestion: NewQuestion, user: ApiUser | null) => {
	const {
		id,
		question,
		answer1text,
		answer2text,
		answer3text,
		answer4text,
		answer1bool,
		answer2bool,
		answer3bool,
		answer4bool,
	} = newQuestion
	try {
		if (!user) return null
		const { data } = await axiosInstance.post(
			`/questions/subjects/${id}`,
			{
				question,
				answer1text,
				answer2text,
				answer3text,
				answer4text,
				answer1bool,
				answer2bool,
				answer3bool,
				answer4bool,
			},
			{
				headers: getJWTHeader(user),
			}
		)

		return data.data
	} catch (error) {
		console.log(error)
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
