import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { teacherQueries } from '../../prisma/queries'
import { controller, get } from '../decorators'

const { getAllTeachers } = teacherQueries

@controller('/teachers')
export class TeacherController {
	@get('/')
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
