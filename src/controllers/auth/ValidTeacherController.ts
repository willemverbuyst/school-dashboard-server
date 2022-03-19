import { NextFunction, Response } from 'express'
import { controller, get, use } from '../decorators'
import { RequestWithBody } from '../../interfaces/Requests'
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware'

@controller('/auth')
class ValidUserController {
	@get('/teacher')
	@use(teacherAuthMiddleware)
	async getValidTeacher(
		req: RequestWithBody,
		res: Response,
		_next: NextFunction
	): Promise<void> {
		try {
			//  all students for this teacher
			const students = {}
			//  all subjects
			const subjects = {}
			// remove password
			const teacher = {}

			res.status(200).send({ data: { teacher, students, subjects } })
		} catch (error) {
			res.status(500).send({ message: 'Something went wrong' })
		}
	}
}
