import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { bodyValidator, controller, post } from '../decorators'
import { toJWT } from '../../auth/jwt'
import { SALT_ROUNDS } from '../../config/constants'

@controller('')
class SignupController {
	@post('/signup')
	@bodyValidator('email', 'password', 'name', 'isStudent')
	async postSignup(
		req: Request,
		res: Response,
		_next: NextFunction
	): Promise<void> {
		try {
			const { isStudent, name, email, teacherId } = req.body

			// // STUDENT
			// if (isStudent && Number(isStudent) === 1) {
			// 	if (!teacherId) {
			// 		res.status(400).send({
			// 			message: 'Please provide teacher id!',
			// 		})
			// 	} else {
			// 		const newStudent = await Student.create({
			// 			email,
			// 			password: bcrypt.hashSync(req.body.password, SALT_ROUNDS),
			// 			name,
			// 			teacherId: Number(teacherId),
			// 		}).then(data => data?.get({ plain: true }))

			// 		const { password, ...newStudentWithoutPassword } = newStudent
			// 		const token = toJWT({ studentId: newStudent.id })
			// 		const subjects = await Subject.findAll({
			// 			attributes: ['id', 'name'],
			// 		})

			// 		res.status(201).json({
			// 			token,
			// 			data: { student: newStudentWithoutPassword, subjects },
			// 			message: 'A new account is created for you',
			// 		})
			// 	}

			// 	// TEACHER
			// } else {
			// 	const newTeacher = await Teacher.create({
			// 		email,
			// 		password: bcrypt.hashSync(req.body.password, SALT_ROUNDS),
			// 		name,
			// 	}).then(data => data?.get({ plain: true }))
			// 	const { password, ...newTeacherWithoutPassword } = newTeacher
			// 	const token = toJWT({ teacherId: newTeacher.id })

			const token = ''
			const newTeacherWithoutPassword = {}

			res.status(201).json({
				token,
				data: { teacher: newTeacherWithoutPassword },
				message: 'A new account is created for you',
			})
		} catch (error: unknown) {
			if (
				error instanceof Error &&
				error.name === 'SequelizeUniqueConstraintError'
			) {
				res
					.status(400)
					.send({ message: 'There is an existing account with this email' })
			} else {
				res.status(400).send({ message: String(error) })
			}

			res.status(500).send({ message: 'Something went wrong' })
		}
	}
}
