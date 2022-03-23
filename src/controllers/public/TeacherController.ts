import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { getAllTeachers } from '../../prisma/queries/teachers'
import { controller, get } from '../decorators'

@controller('/public')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TeachersController {
	@get('/teachers')
	async getTeachers(
		_req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const teachers = await getAllTeachers()

			if (!teachers) {
				res.send({ message: 'No teachers found' })
			}

			res.send({ results: teachers.length, data: teachers })
		} catch (error) {
			next(error)
		}
	}
}
