import { Answer, Question } from '@prisma/client'

interface AnswerForTest {
	id: string
	text: string
}

export interface QuestionForTest extends Question {
	answers: Array<AnswerForTest>
}

export interface QuestionWithAnswers extends Question {
	answers: Array<Answer>
}
