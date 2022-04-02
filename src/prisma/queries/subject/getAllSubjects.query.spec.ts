import { subjects } from '../../dummyData'
import { getAllSubjects } from './getAllSubjects.query'

describe('getAllSubjects', () => {
	test('should return all subjects', async () => {
		const allSubjects = await getAllSubjects()
		expect(allSubjects).toEqual(subjects)
	})
})
