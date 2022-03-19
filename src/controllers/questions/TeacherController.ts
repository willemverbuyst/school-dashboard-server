import { NextFunction, Response } from 'express'

import { RequestWithBody } from '../../interfaces/Requests'
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware'
import { getQuestionsForSubject } from '../../prisma/queries/questions'
import { bodyValidator, controller, get, post, use } from '../decorators'

@controller('/questions')
class SubjectController {
	@get('/:id')
	@use(teacherAuthMiddleware)
	async getQuestionsForSubject(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { id: subjectId } = req.params
		try {
			if (!subjectId) {
				res.status(422).send({ message: 'Must provide subject id' })
				return
			}

			const questions = await getQuestionsForSubject(subjectId)

			if (!questions) {
				res.status(404).send({
					message: 'No questions for that subject found',
				})
				return
			}

			res.send({ results: questions.length, data: questions })
		} catch (error) {
			next(error)
		}
	}

	// Post a new question for a subject
	@post('/')
	@bodyValidator(
		'subjectId',
		'question',
		'answer1',
		'answer2',
		'answer3',
		'answer4'
	)
	@use(teacherAuthMiddleware)
	async postQuestionForSubject(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { subjectId, question, answer1, answer2, answer3, answer4 } = req.body

		if (subjectId && question && answer1 && answer2 && answer3 && answer4) {
			try {
				// const newQuestion = await Question.create({
				// 	text: question,
				// 	subjectId: Number(subjectId),
				// })
				// // Create correct answer
				// await Answer.create({
				// 	text: answer1,
				// 	correct: true,
				// 	questionId: newQuestion.id,
				// })
				// // Create 3 wrong answers
				// ;[answer2, answer3, answer4].forEach(answer =>
				// 	Answer.create({
				// 		text: answer,
				// 		correct: false,
				// 		questionId: newQuestion.id,
				// 	})
				// )

				res.status(201).send({ message: 'You have added a new question.' })
			} catch (error) {
				next(error)
			}
		}
	}
}
