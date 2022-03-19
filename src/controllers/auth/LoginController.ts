import bcrypt from 'bcrypt'
import { NextFunction, Response } from 'express'
import { bodyValidator, controller, post } from '../decorators'
import { toJWT } from '../../auth/jwt'
import { RequestWithBody } from '../../interfaces/Requests'
import { getUserWithProfile } from '../../prisma/queries/user'

@controller('/auth')
class LoginController {
	@post('/login')
	@bodyValidator('email', 'password')
	async postLogin(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { email, password } = req.body

			if (!email) {
				res.status(422).send({ message: 'Must provide email' })
			} else {
				// const user = await getUserWithProfile(email)
				// if (user && password) {
				// 	!bcrypt.compareSync(password, user.password)
				// }
				// 	if (
				// 		typeof password === 'string' &&
				// 		(!student || )
				// 	) {
				// 		res.status(400).send({
				// 			message: 'Student with that email not found or password incorrect',
				// 		})
				// 	} else if (student) {
				// 		const token = toJWT({ studentId: student.id })
				// 		const subjects = await Subject.findAll({
				// 			attributes: ['id', 'name'],
				// 		})
				// 		const { password, ...studentWithoutPassword } = student
				// 		res.status(200).send({
				// 			token,
				// 			data: { student: studentWithoutPassword, subjects },
				// 			message: 'Welcom back',
				// 		})
				// 	}
				// 	// TEACHER
				// } else {
				// 	const teacher = await Teacher.findOne({
				// 		where: { email },
				// 	}).then(data => data?.get({ plain: true }))
				// 	if (
				// 		typeof password === 'string' &&
				// 		(!teacher || !bcrypt.compareSync(password, teacher.password))
				// 	) {
				// 		res.status(400).send({
				// 			message: 'Teacher with that email not found or password incorrect',
				// 		})
				// 	} else if (teacher) {
				// 		const token = toJWT({ teacherId: teacher.id })
				// 		const subjects = await Subject.findAll({
				// 			attributes: ['id', 'name'],
				// 		})
				// 		const students = await Student.findAll({
				// 			where: { teacherId: teacher.id },
				// 			attributes: ['id', 'name'],
				// 		})
				// 		const { password, ...teacherWithoutPassword } = teacher
				// 		res.status(200).send({
				// 			token,
				// 			data: { teacher: teacherWithoutPassword, subjects, students },
				// 			message: 'Welcome back',
				// 		})
				// 	}
			}
		} catch (error: unknown) {
			console.log(error)
			res.status(500).send({ message: 'Something went wrong' })
		}
	}
}
