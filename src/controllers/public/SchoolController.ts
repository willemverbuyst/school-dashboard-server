import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { getAllSchools } from '../../prisma/queries/schools'
import { controller, get } from '../decorators'

@controller('/public')
export class SchoolController {
	@get('/schools')
	async getSchools(
		_req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const schools = await getAllSchools()

			if (!schools) {
				res.send({ message: 'No schools found' })
			}

			res.send({ results: schools.length, data: schools })
		} catch (error) {
			next(error)
		}
	}
}
