import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { studentAuthMiddleware } from '../../middlewares/studentAuthMiddleware'
import { getQuestionsForTest } from '../../prisma/queries/questions'
import { bodyValidator, controller, get, post, use } from '../decorators'

@controller('/questions')
class TestController {
	@get('/subjects/:id/test')
	@use(studentAuthMiddleware)
	async getQuestionsForSubject(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.params

			if (!id) {
				res.status(422).send({ message: 'Must provide subject id' })
				return
			}

			const questions = await getQuestionsForTest(id)

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

	// Post the results of his 3q test
	@post('/questions/3qtest')
	@bodyValidator('q1', 'q2', 'q3', 'a1', 'a2', 'a3', 'subjectId')
	@use(studentAuthMiddleware)
	async postQuestionForSubject(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { q1, q2, q3, a1, a2, a3, subjectId } = req.body
		const studentId = req.student.id

		try {
			// await Test.create({
			// 	question1: Number(q1),
			// 	question2: Number(q2),
			// 	question3: Number(q3),
			// 	answer1: Number(a1),
			// 	answer2: Number(a2),
			// 	answer3: Number(a3),
			// 	subjectId: Number(subjectId),
			// 	studentId: Number(studentId),
			// })

			// const result = Number(a1) + Number(a2) + Number(a3)
			const result = 1
			res.status(201).send({
				message: `You have finished your test with a score of ${result}/3`,
			})
		} catch (error) {
			next(error)
		}
	}
}
