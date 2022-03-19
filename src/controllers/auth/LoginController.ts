import bcrypt from 'bcrypt'
import { NextFunction, Response } from 'express'
import { controller, post } from '../decorators'
import { toJWT } from '../../auth/jwt'
import { RequestWithBody } from '../../interfaces/Requests'
import { getUserByEmail, getUserPlus } from '../../prisma/queries/user'
import { getAllSubjects } from '../../prisma/queries/subjects'

@controller('/auth')
class LoginController {
	@post('/login')
	async postLogin(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { email, password } = req.body

			if (!email) {
				res.status(422).send({ message: 'Must provide email' })
				return
			}

			if (!password) {
				res.status(422).send({ message: 'Must provide password' })
				return
			}

			const user = await getUserByEmail(email)

			if (!user || !bcrypt.compareSync(password, user.password)) {
				res
					.status(404)
					.send({ message: 'User with this email and/or password not found' })
				return
			}

			const token = toJWT({ userId: user.id })
			const subjects = await getAllSubjects()
			const userWithProfile = await getUserPlus(user.id)

			res.status(200).send({
				token,
				data: {
					subjects: { results: subjects.length, data: subjects },
					userWithProfile,
				},
				message: 'Welcome back',
			})
		} catch (error: unknown) {
			console.log(error)
			res.status(500).send({ message: 'Something went wrong' })
		}
	}
}
