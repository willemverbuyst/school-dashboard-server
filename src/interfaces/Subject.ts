export interface SubjectWithAnswers {
	id: number
	name: string
	tests: Answer[]
}

interface Answer {
	answer1: number
	answer2: number
	answer3: number
}

export interface ITest {
	answer1: number
	answer2: number
	answer3: number
	subject: {
		createdAt: Date
		id: number
		name: string
		updatedAt: Date
	}
}
