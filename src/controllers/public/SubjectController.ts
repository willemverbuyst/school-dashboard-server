import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { getAllSubjects } from '../../prisma/queries/subjects'
import { controller, get } from '../decorators'

@controller('/public')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SubjectController {
	@get('/subjects')
	async getAllSubjects(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const subjects = await getAllSubjects()

			if (!subjects) {
				res.send({ message: 'No subjects found' })
			}

			res.send({ results: subjects.length, data: subjects })
		} catch (error) {
			next(error)
		}
	}
	// // TEACHER, post a new subject
	// @post('/general/subjects')
	// @bodyValidator('subject')
	// @use(teacherAuthMiddleware)
	// async postSubject(
	// 	req: RequestWithBody,
	// 	res: Response,
	// 	next: NextFunction
	// ): Promise<void> {
	// 	const { subject } = req.body

	// 	if (subject) {
	// 		try {
	// 			const newSubject = await Subject.create({
	// 				name: subject,
	// 			})

	// 			res
	// 				.status(201)
	// 				.send({ newSubject, message: 'You have added a new subject.' })
	// 		} catch (error) {
	// 			next(error)
	// 		}
	// 	} else {
	// 		res.status(400).send({ message: 'Please provide subject' })
	// 	}
	// }
}
