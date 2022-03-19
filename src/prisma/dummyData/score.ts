import { Score } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { tests } from './test'
import {
	questionsGeography,
	questionsHistory,
	questionsMath,
} from './questions'
import { subjects } from './subjects'

const createScore = (): 1 | 0 => (Math.random() >= 0.5 ? 1 : 0)
const createSubjectIndex = (): number => Math.floor(Math.random() * (4 - 0))

const testsGeography = [...tests].filter(
	test => test.subjectId === subjects[0].id
)
const testsHistory = [...tests].filter(
	test => test.subjectId === subjects[1].id
)
const testsMath = [...tests].filter(test => test.subjectId === subjects[2].id)

export const scoresGeography: Array<Score> = testsGeography.flatMap(test =>
	[1, 2, 3].map((_, i) => ({
		id: uuidv4(),
		score: createScore(),
		questionId: questionsGeography[createSubjectIndex()].id,
		testId: test.id,
	}))
)

export const scoresHistory: Array<Score> = testsHistory.flatMap(test =>
	Array(3).map((_, i) => ({
		id: uuidv4(),
		score: createScore(),
		questionId: questionsHistory[createSubjectIndex()].id,
		testId: test.id,
	}))
)

export const scoresMath: Array<Score> = testsMath.flatMap(test =>
	Array(3).map((_, i) => ({
		id: uuidv4(),
		score: createScore(),
		questionId: questionsMath[createSubjectIndex()].id,
		testId: test.id,
	}))
)

export const scores: Array<Score> = [
	...scoresGeography,
	...scoresHistory,
	...scoresMath,
]
