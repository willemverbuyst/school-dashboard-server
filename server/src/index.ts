import corsMiddleWare from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import loggerMiddleWare from 'morgan'
import { AppRouter } from './AppRouter'
import { PORT } from './config/constants'

import './controllers'

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
