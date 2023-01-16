import 'reflect-metadata'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'

const routeBinder =
  (method: string) =>
  (path: string) =>
  (target: any, key: string): void => {
    Reflect.defineMetadata(MetadataKeys.Path, path, target, key)
    Reflect.defineMetadata(MetadataKeys.Method, method, target, key)
  }

export const del = routeBinder(Methods.Del)
export const get = routeBinder(Methods.Get)
export const patch = routeBinder(Methods.Patch)
export const post = routeBinder(Methods.Post)
export const put = routeBinder(Methods.Put)
