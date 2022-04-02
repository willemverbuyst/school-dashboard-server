import express, { Request, Response, NextFunction } from 'express'
import loggerMiddleWare from 'morgan'
import corsMiddleWare from 'cors'
import { PORT } from './config/constants'
import { AppRouter } from './AppRouter'

import './controllers'
// import './controllers/auth/logout.controller'
// import './controllers/auth/signup.controller'
// import './controllers/auth/validUser.controller'
// import './controllers/questions/question.controller'
// import './controllers/school/school.controller'
// import './controllers/student/student.controller'
// import './controllers/subject/subject.controller'
// import './controllers/teacher/teacher.controller'
// import './controllers/test/test.controller'
// import './controllers/user/user.controller'

const app = express()

app.use(loggerMiddleWare('dev'))

const bodyParserMiddleWare = express.json()
app.use(bodyParserMiddleWare)

app.use(corsMiddleWare())

if (process.env.DELAY) {
	app.use((_req: Request, _res: Response, next: NextFunction) => {
		if (process.env.DELAY) setTimeout(() => next(), Number(process.env.DELAY))
	})
}

app.use(AppRouter.getInstance())

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`)
})
