describe('School-daschboard api', () => {
	context('GET /subjects', () => {
		it('should return a list with all subjects', () => {
			cy.request({
				method: 'GET',
				url: '/subjects',
			}).should(response => {
				cy.log(JSON.stringify(response.body))

				expect(response.status).to.eq(200)
				expect(response.body.results).to.eq(3)
				expect(response.body.data.length).to.be.eq(3)
				expect(response.body.data[0]).to.have.all.keys('id', 'name')
			})
		})
	})
})
