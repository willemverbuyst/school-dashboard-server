describe('School-daschboard api', () => {
	beforeEach(() => {
		cy.restoreLocalStorage()
	})

	context('POST /subjects', () => {
		it('should return 401 with message', function () {
			cy.request({
				method: 'POST',
				url: '/subjects',
				failOnStatusCode: false,
				body: { name: 'new_subject' },
			}).should(response => {
				expect(response.status).to.eq(401)
				expect(response.body.message).to.equal(
					'This endpoint requires an Authorization header with a valid token'
				)
			})
		})

		it('should return 422 with message', function () {
			cy.saveTokenTeacher()
			cy.saveLocalStorage()
			cy.getLocalStorage('teacher_token')
				.then(token =>
					cy.request({
						method: 'POST',
						url: '/subjects',
						failOnStatusCode: false,
						auth: { bearer: token },
						body: {},
					})
				)
				.should(response => {
					expect(response.status).to.eq(422)
					expect(response.body.message).to.equal(
						'Must provide name for subject'
					)
				})
		})

		it('should return 200 with new subject', function () {
			cy.saveTokenTeacher()
			cy.saveLocalStorage()
			cy.getLocalStorage('teacher_token')
				.then(token =>
					cy.request({
						method: 'POST',
						url: '/subjects',
						failOnStatusCode: false,
						auth: { bearer: token },
						body: { subjectName: 'new_subject' },
					})
				)
				.should(response => {
					expect(response.status).to.eq(200)
					expect(response.body.data).to.have.all.keys('id', 'name')
					expect(response.body.data.name).to.equal('new_subject')
				})
		})

		it('should return a list with all subjects', () => {
			cy.request({
				method: 'GET',
				url: '/subjects',
			}).should(response => {
				expect(response.status).to.eq(200)
				expect(response.body.results).to.eq(3)
				expect(response.body.data.length).to.be.eq(3)
				expect(response.body.data[0]).to.have.all.keys('id', 'name')
			})
		})
	})
})
