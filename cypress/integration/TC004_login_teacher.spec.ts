describe('School-daschboard api', () => {
	beforeEach(function () {
		cy.fixture('teacher').as('data')
	})

	context('POST /login', () => {
		it('should return a user with token, data and message', function () {
			cy.request('POST', '/auth/login', {
				email: this.data.email,
				password: this.data.password,
			}).should(response => {
				expect(response.status).to.eq(200)
				expect(response.body).to.have.all.keys('token', 'data', 'message')
			})
		})
	})
})
