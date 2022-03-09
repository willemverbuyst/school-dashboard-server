import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'

export const bodyValidator =
	(...keys: string[]) =>
	(target: any, key: string, _desc: PropertyDescriptor): void =>
		Reflect.defineMetadata(MetadataKeys.Validator, keys, target, key)
