import { NextFunction, Request, Response } from 'express'
import { controller, post } from '../decorators'
import { toJWT } from '../../auth/jwt'
import { createUserStudent } from '../../prisma/queries/user'
import { getAllSubjects } from '../../prisma/queries/subjects'

@controller('/auth')
class SignupController {
	@post('/signup/student')
	async postSignup(
		req: Request,
		res: Response,
		_next: NextFunction
	): Promise<void> {
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

			const token = toJWT({ studentId: user.id })
			const subjects = await getAllSubjects()

			res.status(200).send({
				token,
				data: {
					subjects: { results: subjects.length, data: subjects },
					user,
				},
				message: 'Welcome',
			})

			// 	// TEACHER
			// } else {
			// 	const newTeacher = await Teacher.create({
			// 		email,
			// 		password: bcrypt.hashSync(req.body.password, SALT_ROUNDS),
			// 		name,
			// 	}).then(data => data?.get({ plain: true }))
			// 	const { password, ...newTeacherWithoutPassword } = newTeacher
			// 	const token = toJWT({ teacherId: newTeacher.id })

			// const token = ''
			// const newTeacherWithoutPassword = {}

			// res.status(201).json({
			// 	token,
			// 	data: { teacher: newTeacherWithoutPassword },
			// 	message: 'A new account is created for you',
			// })
		} catch (error: unknown) {
			res.status(400).send({ message: String(error) })
			return
		}
	}
}
