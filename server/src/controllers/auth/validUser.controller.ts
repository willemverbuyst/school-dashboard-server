import { Response } from 'express'
import { controller, get, use } from '../decorators'
import { RequestWithBody } from '../../interfaces/Requests'
import { subjectQueries, testQueries, userQueries } from '../../queries'
import { userAuthMiddleware } from '../../middlewares/userAuthMiddleware'
import { toJWT } from '../../auth/jwt'
import { Role } from '@prisma/client'

const { getAllTestsForTeacher, getTestsForStudent } = testQueries
const { getAllSubjects } = subjectQueries
const { getUserPlus } = userQueries

@controller('/auth')
export class ValidUserController {
	@use(userAuthMiddleware)
	@get('/user')
	async getValidUser(req: RequestWithBody, res: Response): Promise<void> {
		try {
			const { userId } = req.body
			if (!userId) {
				res.status(500).send({ message: 'Something went wrong' })
				return
			}

			const token = toJWT({ userId })
			const subjects = await getAllSubjects()
			const userWithProfile = await getUserPlus(userId)

			const response = {
				token,
				data: {
					user: userWithProfile,
					subjects: { results: subjects.length, data: subjects },
					overview: {},
				},
				message: 'Valid user',
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
		} catch (error) {
			res.status(500).send({ message: 'Something went wrong' })
		}
	}
}
