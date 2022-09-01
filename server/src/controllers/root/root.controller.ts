import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { controller, get } from '../decorators'

@controller('/')
export class RootController {
	@get('/')
	async getRoot(
		_req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			res.status(200).send({
				message: 'Hello from the school dashboard server',
			})
		} catch (error) {
			next(error)
		}
	}
}
