import { subjects } from '../../dummyData'
import { getSubject } from './getSubject.query'

describe('getSubject', () => {
	subjects.forEach(async element => {
		test(`should return subject ${element.name}`, async () => {
			const subject = await getSubject(element.id)
			expect(subject).toEqual({
				id: element.id,
				name: element.name,
			})
		})
	})
})
