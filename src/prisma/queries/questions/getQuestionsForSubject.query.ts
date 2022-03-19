import { prismaClient } from '../../../prisma'

export const getQuestionsForSubject = async (id: string) => {
	const questionsForSubject = await prismaClient.question.findMany({
		where: { subjectId: id },
	})

	return questionsForSubject
}
