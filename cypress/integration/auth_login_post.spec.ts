describe('School-daschboard api', () => {
	context('POST /auth/login', () => {
		it('should return 200 with valid credentials', function () {
			cy.request('POST', '/auth/login', {
				email: 'test@teacher.com',
				password: '123',
			}).should(response => {
				expect(response.status).to.eq(200)
				expect(response.body).to.have.all.keys('token', 'data', 'message')
				cy.log(JSON.stringify(response.body))
			})
		})

		it('should return 422 with missing password', function () {
			cy.request({
				method: 'POST',
				url: '/auth/login',
				failOnStatusCode: false,
				body: {
					email: 'test@teacher.com',
				},
			}).should(response => {
				expect(response.status).to.eq(422)
				expect(response.body.message).to.equal('Missing input')
			})
		})

		it('should return 422 with missing email', function () {
			cy.request({
				method: 'POST',
				url: '/auth/login',
				failOnStatusCode: false,
				body: {
					password: '123',
				},
			}).should(response => {
				expect(response.status).to.eq(422)
				expect(response.body.message).to.equal('Missing input')
			})
		})

		it('should return 404 with unknown email', function () {
			cy.request({
				method: 'POST',
				url: '/auth/login',
				failOnStatusCode: false,
				body: {
					email: 'wrong@email.com',
					password: '123',
				},
			}).should(response => {
				expect(response.status).to.eq(404)
				expect(response.body.message).to.equal(
					'User with this email and/or password not found'
				)
			})
		})

		it('should return 404 with wrong password', function () {
			cy.request({
				method: 'POST',
				url: '/auth/login',
				failOnStatusCode: false,
				body: {
					email: 'wrong@email.com',
					password: 'wrongpassword123',
				},
			}).should(response => {
				expect(response.status).to.eq(404)
				expect(response.body.message).to.equal(
					'User with this email and/or password not found'
				)
			})
		})
	})
})
