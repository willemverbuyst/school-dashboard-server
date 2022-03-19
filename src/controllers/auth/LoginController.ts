import bcrypt from 'bcrypt'
import { NextFunction, Response } from 'express'
import { bodyValidator, controller, post } from '../decorators'
import { toJWT } from '../../auth/jwt'
import Student from '../../db/models/student'
import Subject from '../../db/models/subject'
import Teacher from '../../db/models/teacher'
import { RequestWithBody } from '../../interfaces/Requests'
import { getUserWithProfile } from '../../prisma/queries/user'

@controller('')
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

			if (email) {
				const user = await getUserWithProfile(email)
			}

			// 	if (
			// 		typeof password === 'string' &&
			// 		(!student || !bcrypt.compareSync(password, student.password))
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
			// }
		} catch (error) {
			console.log(error)
			res.status(500).send({ message: 'Something went wrong' })
		}
	}
}
