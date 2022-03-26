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

export interface NewQuestionWithAnswers {
	question: string
	answer1text: string
	answer2text: string
	answer3text: string
	answer4text: string
	answer1bool: boolean
	answer2bool: boolean
	answer3bool: boolean
	answer4bool: boolean
	subjectId: string
}
