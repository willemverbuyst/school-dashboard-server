import { Score } from '@prisma/client'
import { prismaClient } from '../../../prisma'
import { TestForStudent, TestWithSubjectAndScores } from './models'

const sumScores = (scores: Array<Score>): number =>
	scores.map(score => score.score).reduce((sum, score) => sum + score, 0)

const formatTestsForStudentAndSubject = (
	tests: Array<TestWithSubjectAndScores>
): Array<TestForStudent> => {
	return tests.map((test: any) => ({
		id: test.id,
		createdAt: test.createdAt,
		subject: test.subject,
		score: sumScores(test.scores),
	}))
}

export const getTestForStudentAndSubject = async (
	studentId: string,
	subjectId: string
): Promise<Array<TestForStudent> | []> => {
	const tests = await prismaClient.test.findMany({
		where: {
			studentId,
			subjectId,
		},
		include: { subject: true, scores: true },
	})

	if (tests) return formatTestsForStudentAndSubject(tests)
	return []
}
