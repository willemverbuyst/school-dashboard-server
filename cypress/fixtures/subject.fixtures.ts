import { Subject } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

export const subjects: Array<Subject> = Array(3)
	.fill(0)
	.map((_, i) => ({
		id: uuidv4(),
		name: `test_name_${i + 1}`,
	}))
