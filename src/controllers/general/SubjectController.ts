import { NextFunction, Response } from 'express'
import Subject from '../../db/models/subject'
import { RequestWithBody } from '../../interfaces/Requests'
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware'
import { bodyValidator, controller, get, post, use } from '../decorators'

@controller('')
class SubjectController {
	// PUBLIC, get all subjects
	@get('/general/subjects')
	async getAllSubjects(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const subjects = await Subject.findAll({ attributes: ['id', 'name'] })

			res.send(subjects)
		} catch (error) {
			next(error)
		}
	}
	// TEACHER, post a new subject
	@post('/general/subjects')
	@bodyValidator('subject')
	@use(teacherAuthMiddleware)
	async postSubject(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { subject } = req.body

		if (subject) {
			try {
				const newSubject = await Subject.create({
					name: subject,
				})

				res
					.status(201)
					.send({ newSubject, message: 'You have added a new subject.' })
			} catch (error) {
				next(error)
			}
		} else {
			res.status(400).send({ message: 'Please provide subject' })
		}
	}
}
