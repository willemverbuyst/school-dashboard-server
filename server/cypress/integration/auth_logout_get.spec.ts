describe('School-daschboard api', () => {
	context('POST /auth/logout', () => {
		it('should return "You are logged out"', function () {
			cy.request('GET', '/auth/logout').should(response => {
				expect(response.status).to.eq(200)
				expect(response.body.message).to.equal('You are logged out')
			})
		})
	})
})
