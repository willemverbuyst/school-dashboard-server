import { NextFunction, Response } from 'express'
import { controller, get, use } from '../decorators'
import { RequestWithBody } from '../../interfaces/Requests'
import { studentAuthMiddleware } from '../../middlewares/studentAuthMiddleware'

@controller('/auth')
class ValidStudentController {
	@get('/student')
	@use(studentAuthMiddleware)
	async getValidStudent(
		req: RequestWithBody,
		res: Response,
		_next: NextFunction
	): Promise<void> {
		try {
			// All subjects
			const subjects = {}
			// student without password
			const student = {}

			res.status(200).send({ data: { student, subjects } })
		} catch (error) {
			res.status(500).send({ message: 'Something went wrong' })
		}
	}
}
