import { NextFunction, Response } from 'express'
import Answer from '../../db/models/answer'
import Question from '../../db/models/question'
import { RequestWithBody } from '../../interfaces/Requests'
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware'
import { bodyValidator, controller, get, post, use } from '../decorators'

@controller('')
class TeachersController {
	// Get all the questions for one subject
	@get('/questions/:id')
	@use(teacherAuthMiddleware)
	async getQuestionsForSubject(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { id: subjectId } = req.params
		try {
			const questions = await Question.findAll({
				where: { subjectId },
				attributes: ['id', 'subjectId', 'text'],
				include: {
					model: Answer,
					as: 'answers',
					attributes: ['id', 'questionId', 'text', 'correct'],
				},
			})
			if (!questions) {
				res.status(404).send({
					message: 'No questions for that subject found',
				})
			} else {
				res.send(questions)
			}
		} catch (error) {
			next(error)
		}
	}

	// Post a new question for a subject
	@post('/questions')
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
				const newQuestion = await Question.create({
					text: question,
					subjectId: Number(subjectId),
				})
				// Create correct answer
				await Answer.create({
					text: answer1,
					correct: true,
					questionId: newQuestion.id,
				})
				// Create 3 wrong answers
				;[answer2, answer3, answer4].forEach(answer =>
					Answer.create({
						text: answer,
						correct: false,
						questionId: newQuestion.id,
					})
				)

				res.status(201).send({ message: 'You have added a new question.' })
			} catch (error) {
				next(error)
			}
		}
	}
}
