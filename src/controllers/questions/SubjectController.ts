import { NextFunction, Response } from 'express'

import { RequestWithBody } from '../../interfaces/Requests'
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware'
import {
	createQuestionWithAnswers,
	getQuestionsForSubject,
} from '../../prisma/queries/questions'
import { controller, get, post, use } from '../decorators'

@controller('/questions')
export class SubjectController {
	@get('/subjects/:id')
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

	@post('/subjects/:id')
	@use(teacherAuthMiddleware)
	async postQuestionForSubject(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id: subjectId } = req.params
			const {
				question,
				answer1text,
				answer2text,
				answer3text,
				answer4text,
				answer1bool,
				answer2bool,
				answer3bool,
				answer4bool,
			} = req.body

			if (!subjectId) {
				res.status(422).send({ message: 'Must provide subject id' })
				return
			}

			if (
				!question ||
				!answer1text ||
				!answer2text ||
				!answer3text ||
				!answer4text ||
				typeof answer1bool !== 'boolean' ||
				typeof answer2bool !== 'boolean' ||
				typeof answer3bool !== 'boolean' ||
				typeof answer4bool !== 'boolean'
			) {
				res.status(422).send({ message: 'Missing input' })
				return
			}

			const newQuestion = await createQuestionWithAnswers({
				question,
				answer1text,
				answer2text,
				answer3text,
				answer4text,
				answer1bool,
				answer2bool,
				answer3bool,
				answer4bool,
				subjectId,
			})

			if (!newQuestion) {
				res
					.status(422)
					.send({ message: 'Something went wrong, question not creaeted' })
				return
			}

			res.status(201).send({
				data: { question: newQuestion },
				message: 'You have added a new question.',
			})
		} catch (error) {
			next(error)
		}
	}
}
