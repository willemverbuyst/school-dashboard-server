import { RequestHandler } from 'express'
import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'

export const use =
  (middleware: RequestHandler) =>
  (target: any, key: string): void => {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.Middleware, target, key) || []

    Reflect.defineMetadata(
      MetadataKeys.Middleware,
      [...middlewares, middleware],
      target,
      key
    )
  }
