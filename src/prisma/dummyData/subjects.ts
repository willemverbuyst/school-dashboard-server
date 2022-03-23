import { Subject } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const names = ['geography', 'history', 'math']

export const subjects: Array<Subject> = names.map(name => ({
	id: uuidv4(),
	name,
}))
