import { Request, Response } from 'express'
import { controller, post } from '../decorators'
import { toJWT } from '../../auth/jwt'
import { createUserStudent, createUserTeacher } from '../../prisma/queries/user'
import { getAllSubjects } from '../../prisma/queries/subjects'

@controller('/auth')
export class SignupController {
	@post('/signup/student')
	async postSignupStudent(req: Request, res: Response): Promise<void> {
		try {
			const { email, userName, password, bio, schoolId, teacherId } = req.body

			if (!email || !userName || !password || !bio || !schoolId || !teacherId) {
				res.status(422).send({ message: 'Missing input' })
				return
			}

			const user = await createUserStudent(
				email,
				userName,
				password,
				bio,
				schoolId,
				teacherId
			)

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
				},
				message: 'Welcome',
			})
		} catch (error: unknown) {
			res.status(400).send({ message: String(error) })
		}
	}

	@post('/signup/teacher')
	async postSignupTeacher(req: Request, res: Response): Promise<void> {
		try {
			const { email, userName, password, bio, schoolId } = req.body

			if (!email || !userName || !password || !bio || !schoolId) {
				res.status(422).send({ message: 'Missing input' })
				return
			}

			const user = await createUserTeacher(
				email,
				userName,
				password,
				bio,
				schoolId
			)

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
				},
				message: 'Welcome',
			})
		} catch (error: unknown) {
			res.status(400).send({ message: String(error) })
		}
	}
}
