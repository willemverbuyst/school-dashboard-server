import prismaClient from '../../../prisma'

const getScore = async (id: string): Promise<number> => {
	const answer = await prismaClient.answer.findUnique({ where: { id } })
	if (answer) {
		if (answer.correct) return 1
	}
	return 0
}

export const createTest = async (
	answer1: string,
	answer2: string,
	answer3: string,
	question1: string,
	question2: string,
	question3: string,
	studentId: string,
	subjectId: string
): Promise<number> => {
	const score1 = await getScore(answer1)
	const score2 = await getScore(answer2)
	const score3 = await getScore(answer3)

	await prismaClient.test.create({
		data: {
			studentId,
			subjectId,
			scores: {
				createMany: {
					data: [
						{
							score: score1,
							questionId: question1,
						},
						{
							score: score2,
							questionId: question2,
						},
						{
							score: score3,
							questionId: question3,
						},
					],
				},
			},
		},
	})

	return score1 + score2 + score3
}
