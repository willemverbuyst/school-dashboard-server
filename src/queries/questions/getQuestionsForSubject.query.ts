import { prismaClient } from '../../prisma'
import { QuestionWithAnswers } from './models'

export const getQuestionsForSubject = async (
	id: string
): Promise<Array<QuestionWithAnswers> | null> => {
	const questionsForSubject = await prismaClient.question.findMany({
		where: { subjectId: id },
		include: { answers: true },
	})

	if (questionsForSubject.length > 0) return questionsForSubject
	return null
}
