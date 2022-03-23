import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'

export const bodyValidator =
	(...keys: string[]) =>
	(target: any, key: string): void =>
		Reflect.defineMetadata(MetadataKeys.Validator, keys, target, key)
