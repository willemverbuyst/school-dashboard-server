import { School } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

export const schools: Array<School> = [
	{
		id: uuidv4(),
		name: 'Compu',
		location: 'Nerdsville',
	},
	{
		id: uuidv4(),
		name: 'Run Faster',
		location: 'Downhill',
	},
]
