import { prismaClient } from '../../prisma'

const getTestsWithSummedScores = (tests: any): any => {
	return tests.map((test: any) => ({
		...test,
		scores: test.scores
			.map((score: any) => score.score)
			.reduce((sum: number, score: number) => sum + score, 0),
	}))
}

// const getSubjectIds = (tests: any): Array<string> => {
// 	const ids = tests.map((test: any) => test.subjectId)
// 	return Array.from(new Set(ids))
// }

// const tests = await Test.findAll({
// 	attributes: ['subjectId', 'answer1', 'answer2', 'answer3', 'createdAt'],
// 	include: [
// 		{
// 			model: Student,
// 			as: 'student',
// 			where: { teacherId },
// 			attributes: ['id', 'teacherId'],
// 		},
// 	],
// })

// const allTests = tests.map((test: any) => {
// 	return {
// 		subjectId: test.subjectId,
// 		result: test.answer1 + test.answer2 + test.answer3,
// 		at: test.createdAt,
// 	}
// })

// // Query to get average per subject
// const subjects = await Subject.findAll()

// const getAveragePerSubject = (tests: any, subjectIds: Array<string>): any => {
// 	const scores = subjectIds
// 		.map(subjectId => tests.filter(test => test.subjectId === subjectId))
// 		.map((subject: any) => {
// 			return {
// 				subjectId: subject.id,
// 				length: subject.length,
// 				result: Math.round(
// 					(subject
// 						.map((sub: any) => sub.score)
// 						.reduce((a: number, b: number) => a + b, 0) /
// 						(subject.length * 3)) *
// 						100
// 				),
// 			}
// 		})
// 	return scores
// }

// const scores = subjects
// 	.map(subject => allTests.filter(test => test.subjectId === subject.id))
// 	.map((subject: any) => {
// 		return {
// 			subjectId: subject.id,
// 			length: subject.length,
// 			result: Math.round(
// 				(subject
// 					.map((sub: any) => sub.result)
// 					.reduce((a: number, b: number) => a + b, 0) /
// 					(subject.length * 3)) *
// 					100
// 			),
// 		}
// 	})
// const allTests = {}
// const scores = {}

export const getAllTestsForTeacher = async (
	teacherId: string
): Promise<any> => {
	const tests = await prismaClient.test.findMany({
		where: {
			student: {
				teacherId,
			},
		},
		include: {
			scores: { select: { score: true } },
		},
	})

	if (tests) {
		const testsWithSummedScores = getTestsWithSummedScores(tests)
		// const subjectIds = getSubjectIds(tests)
		return { testsWithSummedScores }
	}
	return null
}
