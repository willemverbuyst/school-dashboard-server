import { NextFunction, Request, RequestHandler, Response } from 'express'
import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import { MetadataKeys } from './MetadataKeys'
import { Methods } from './Methods'

const bodyValidators =
	(keys: string): RequestHandler =>
	(req: Request, res: Response, next: NextFunction): void => {
		if (!req.body) {
			res.status(422).send('Invalid request')
			return
		}

		for (const key of keys) {
			if (!req.body[key]) {
				const message = `Missing property: ${key}`
				res.status(422).send({ message })
				return
			}
		}

		next()
	}

export function controller(routePrefix: string) {
	return function (target: Function): void {
		const router = AppRouter.getInstance()

		for (const key in target.prototype) {
			const routeHandler = target.prototype[key]
			const path = Reflect.getMetadata(MetadataKeys.Path, target.prototype, key)
			const method: Methods = Reflect.getMetadata(
				MetadataKeys.Method,
				target.prototype,
				key
			)
			const middlewares =
				Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) ||
				[]
			const requiredBodyProps =
				Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) || []
			const validator = bodyValidators(requiredBodyProps)

			if (path) {
				router[method](
					`${routePrefix}${path}`,
					...middlewares,
					validator,
					routeHandler
				)
			}
		}
	}
}
