import { Request, Response } from 'express'
import { controller, get } from '../decorators'

@controller('/auth')
// eslint-disable-next-line no-unused-vars
class LogoutController {
	@get('/logout')
	getLogout(_req: Request, res: Response): void {
		res.send({ message: 'You are logged out' })
	}
}
