import { NextFunction, Response } from 'express'
import { controller, get, use } from '../decorators'
import { RequestWithBody } from '../../interfaces/Requests'
import { studentAuthMiddleware } from '../../middlewares/studentAuthMiddleware'
import { getAllSubjects } from '../../prisma/queries/subjects'
import { getUserPlus } from '../../prisma/queries/user'

@controller('/auth')
class ValidStudentController {
	@get('/student')
	@use(studentAuthMiddleware)
	async getValidStudent(
		req: RequestWithBody,
		res: Response,
		_next: NextFunction
	): Promise<void> {
		try {
			const { userId } = req.body
			if (!userId) {
				res.status(500).send({ message: 'Something went wrong' })
				return
			}

			const subjects = await getAllSubjects()
			const userWithProfile = await getUserPlus(userId)

			res.status(200).send({ data: { user: userWithProfile, subjects } })
		} catch (error) {
			res.status(500).send({ message: 'Something went wrong' })
		}
	}
}
