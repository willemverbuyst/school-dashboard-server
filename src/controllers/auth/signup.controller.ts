import { Request, Response } from 'express'
import { controller, post } from '../decorators'
import { toJWT } from '../../auth/jwt'
import { subjectQueries, userQueries } from '../../queries'

const { getAllSubjects } = subjectQueries
const { createUserStudent, createUserTeacher } = userQueries

@controller('/auth')
export class SignupController {
	@post('/signup')
	async postSignup(req: Request, res: Response): Promise<void> {
		try {
			const { bio, bsn, email, password, role, schoolId, teacherId, userName } =
				req.body

			if (
				!bio ||
				!bsn ||
				!email ||
				!password ||
				!role ||
				!schoolId ||
				!userName
			) {
				res.status(422).send({ message: 'Missing input' })
				return
			}

			if (role === 'student' && !teacherId) {
				res.status(422).send({ message: 'Missing input' })
				return
			}

			let user
			if (role === 'student') {
				user = await createUserStudent({
					email,
					userName,
					passwordText: password,
					bio,
					bsn,
					schoolId,
					teacherId,
				})
			} else {
				user = await createUserTeacher({
					email,
					userName,
					passwordText: password,
					bio,
					bsn,
					schoolId,
				})
			}

			if (!user) {
				res.status(500).send({ message: 'User not created' })
				return
			}

			const token = toJWT({ userId: user.id })
			const subjects = await getAllSubjects()

			res.status(200).send({
				token,
				data: {
					subjects: { results: subjects.length, data: subjects },
					user,
					overview: {},
				},
				message: 'Welcome',
			})
		} catch (error: unknown) {
			res.status(400).send({ message: String(error) })
		}
	}
}
