import { School } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

export const schools: Array<School> = Array(2)
	.fill(0)
	.map(i => ({
		id: uuidv4(),
		name: `test_name_${i + 1}`,
		location: `test_location_${i + 1}`,
	}))
