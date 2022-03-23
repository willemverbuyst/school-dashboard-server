import { Response } from 'express'
import { controller, get, use } from '../decorators'
import { RequestWithBody } from '../../interfaces/Requests'
import { getAllSubjects } from '../../prisma/queries/subjects'
import { getUserPlus } from '../../prisma/queries/user'
import { userAuthMiddleware } from '../../middlewares/userAuthMiddleware'

@controller('/auth')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ValidStudentController {
	@use(userAuthMiddleware)
	@get('/user')
	async getValidStudent(req: RequestWithBody, res: Response): Promise<void> {
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
