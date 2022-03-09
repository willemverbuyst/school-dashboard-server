import { NextFunction, Response } from 'express'
import { controller, get, use } from '../decorators'
import Subject from '../../db/models/subject'
import { RequestWithBody } from '../../interfaces/Requests'
import { studentAuthMiddleware } from '../../middlewares/studentAuthMiddleware'

@controller('')
class ValidStudentController {
	@get('/student')
	@use(studentAuthMiddleware)
	async getValidStudent(
		req: RequestWithBody,
		res: Response,
		_next: NextFunction
	): Promise<void> {
		try {
			const subjects = await Subject.findAll({ attributes: ['id', 'name'] })
			const { password, ...student } = req.student

			res.status(200).send({ data: { student, subjects } })
		} catch (error) {
			res.status(500).send({ message: 'Something went wrong' })
		}
	}
}
