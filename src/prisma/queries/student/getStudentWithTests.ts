/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { prismaClient } from '../../../prisma'

const getTestsWithSummedScores = (tests: any): any => {
	const arr = tests
		.map((test: any) => ({
			...test,
			scores: test.scores
				.map((score: any) => score.score)
				.reduce((sum: number, score: number) => sum + score, 0),
		}))
		.map((testWithScore: any) => ({
			score: testWithScore.scores,
			subjectId: testWithScore.subject.id,
			name: testWithScore.subject.name,
		}))

	const res = groupBy(arr, 'subjectId')

	return res
}

// Accepts the array and key
const groupBy = (array: any, key: any) => {
	// Return the end result
	return array.reduce((result: any, currentValue: any) => {
		// If an array already present for key, push it to the array. Else create an array and push the object
		;(result[currentValue[key]] = result[currentValue[key]] || []).push(
			currentValue
		)
		// Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
		return result
	}, {}) // empty object is the initial value for result object
}

export const getStudentWithTests = async (
	studendId: string
): Promise<any | null> => {
	const studentAndTests = await prismaClient.student.findUnique({
		where: { id: studendId },
		include: { tests: { select: { scores: true, subject: true } } },
	})

	if (studentAndTests) {
		return getTestsWithSummedScores(studentAndTests.tests)
	}
	return null
	// return studentAndTests
}

// const subjects = await Subject.findAll({
// 	attributes: ['id', 'name'],
// 	include: {
// 		model: Test,
// 		as: 'tests',
// 		where: { studentId: id },
// 		attributes: ['answer1', 'answer2', 'answer3'],
// 	},
// })

// const results = subjects.map((subject: any) => {
// 	return {
// 		subjectId: subject.id,
// 		name: subject.name,
// 		score: Math.round(
// 			(subject.tests
// 				.map(
// 					(test: { answer1: number; answer2: number; answer3: number }) =>
// 						test.answer1 + test.answer2 + test.answer3
// 				)
// 				.reduce((a: number, b: number) => a + b, 0) /
// 				(subject.tests.length * 3)) *
// 				100
// 		),
// 		tests: subject.tests.length,
// 	}
// })
