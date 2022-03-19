import { NextFunction, Response } from 'express'
import { toData } from '../auth/jwt'
import { RequestWithBody } from '../interfaces/Requests'

export const teacherAuthMiddleware = async (
	req: RequestWithBody,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const auth = req.headers.authorization && req.headers.authorization.split(' ')

	if (!auth || !(auth[0] === 'Bearer') || !auth[1]) {
		res.status(401).send({
			message:
				'This endpoint requires an Authorization header with a valid token',
		})
	} else {
		try {
			// const data = toData(auth[1])
			// const teacher = await Teacher.findByPk(
			// 	(<{ teacherId: number }>data).teacherId
			// ).then(data => data?.get({ plain: true }))

			// if (!teacher) {
			// 	res.status(404).send({ message: 'Teacher does not exist' })
			// } else {
			// 	req.teacher = teacher
			// }

			return next()
		} catch (error) {
			let message
			let name
			if (error instanceof Error) {
				message = error.message
				name = error.name
			} else {
				message = String(error)
				name = 'Error'
			}
			console.log('ERROR IN AUTH MIDDLEWARE', error)

			switch (name) {
				case 'TokenExpiredError':
					res.status(401).send({ error: name, message: message })

				case 'JsonWebTokenError':
					res.status(400).send({ error: name, message: message })

				default:
					res.status(400).send({
						message: 'Something went wrong, sorry',
					})
			}
		}
	}
}
