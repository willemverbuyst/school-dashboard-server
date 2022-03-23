import prismaClient from '../../../prisma'
import { QuestionWithAnswers } from './models'

const getQuestionsForSubject = async (
	id: string
): Promise<Array<QuestionWithAnswers>> => {
	const questionsForSubject = await prismaClient.question.findMany({
		where: { subjectId: id },
		include: { answers: true },
	})

	return questionsForSubject
}

export default getQuestionsForSubject
