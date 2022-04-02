import { teacher } from '../fixtures/teacher'

describe('School-daschboard api', () => {
	context('POST /auth/login', () => {
		it('should return a user with token, data and message', function () {
			cy.request('POST', '/auth/login', {
				email: teacher.email,
				password: teacher.password,
			}).should(response => {
				expect(response.status).to.eq(200)
				expect(response.body).to.have.all.keys('token', 'data', 'message')
			})
		})
	})
})
