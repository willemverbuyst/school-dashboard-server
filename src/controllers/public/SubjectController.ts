import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { getAllSubjects } from '../../prisma/queries/subjects'
import { controller, get } from '../decorators'

@controller('/public')
export class SubjectController {
	@get('/subjects')
	async getAllSubjects(
		_req: RequestWithBody,
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
}
