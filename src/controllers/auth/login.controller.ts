import bcrypt from 'bcrypt'
import { Response } from 'express'
import { controller, post } from '../decorators'
import { toJWT } from '../../auth/jwt'
import { RequestWithBody } from '../../interfaces/Requests'
import { subjectQueries, testQueries, userQueries } from '../../prisma/queries'
import { Role } from '@prisma/client'

const { getAllTestsForTeacher, getTestsForStudent } = testQueries
const { getAllSubjects } = subjectQueries
const { getUserByEmail, getUserPlus } = userQueries

@controller('/auth')
export class LoginController {
	@post('/login')
	async postLogin(req: RequestWithBody, res: Response): Promise<void> {
		try {
			const { email, password } = req.body

			if (!email || !password) {
				res.status(422).send({ message: 'Missing input' })
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

			const response = {
				token,
				data: {
					subjects: { results: subjects.length, data: subjects },
					user: userWithProfile,
					overview: {},
				},
				message: 'Welcome back',
			}

			if (
				userWithProfile &&
				userWithProfile.role === Role.STUDENT &&
				userWithProfile.student &&
				userWithProfile.student.id
			) {
				const tests = await getTestsForStudent(userWithProfile.student?.id)
				response.data.overview = { results: tests.length, data: tests }
			}

			if (
				userWithProfile &&
				userWithProfile.role === Role.TEACHER &&
				userWithProfile.teacher &&
				userWithProfile.teacher.id
			) {
				const tests = await getAllTestsForTeacher(userWithProfile.teacher?.id)
				response.data.overview = { results: tests.length, data: tests }
			}

			res.status(200).send(response)
		} catch (error: unknown) {
			// console.log(error)
			res.status(500).send({ message: 'Something went wrong' })
		}
	}
}
