import { prismaClient } from '../../prisma'
import { QuestionForTest } from './models'

// https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array
const shuffleQuestions = (
	questions: Array<QuestionForTest>
): Array<QuestionForTest> =>
	questions
		.map((question: any) => ({
			answers: question.answers.sort(() => 0.5 - Math.random()),
			id: question.id,
			text: question.text,
			subjectId: question.subjectId,
		}))
		.sort(() => 0.5 - Math.random())
		.slice(0, 3)

export const getQuestionsForTest = async (
	id: string
): Promise<Array<QuestionForTest>> => {
	const questionsForSubject = await prismaClient.question.findMany({
		where: {
			subjectId: id,
		},
		select: {
			id: true,
			subjectId: true,
			text: true,
			answers: {
				select: {
					id: true,
					text: true,
				},
			},
		},
	})

	const questions = shuffleQuestions(questionsForSubject)

	return questions
}
