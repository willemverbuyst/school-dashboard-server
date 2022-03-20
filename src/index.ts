import express, { Request, Response, NextFunction } from 'express'
import loggerMiddleWare from 'morgan'
import corsMiddleWare from 'cors'
import { PORT } from './config/constants'
import { AppRouter } from './AppRouter'

import './controllers/auth/LoginController'
import './controllers/auth/LogoutController'
import './controllers/auth/SignupController'
import './controllers/auth/ValidUserController'
import './controllers/data/StudentController'
import './controllers/data/TeacherController'
import './controllers/public/TeacherController'
import './controllers/public/SchoolController'
import './controllers/public/SubjectController'
import './controllers/questions/TestController'
import './controllers/questions/TeacherController'

const app = express()

app.use(loggerMiddleWare('dev'))

const bodyParserMiddleWare = express.json()
app.use(bodyParserMiddleWare)

app.use(corsMiddleWare())

if (process.env.DELAY) {
	app.use((_req: Request, _res: Response, next: NextFunction) => {
		if (process.env.DELAY) setTimeout(() => next(), parseInt(process.env.DELAY))
	})
}

app.use(AppRouter.getInstance())

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`)
})
