describe('School-daschboard api', () => {
	context('POST /auth/signup (teacher)', () => {
		it('should return 422 with message - missing input', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {},
			}).should(response => {
				expect(response.status).to.eq(422)
				expect(response.body.message).to.equal('Missing input')
			})
		})

		it('should return 422 with message - missing email', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {
					bsn: '999998997',
					bio: 'Testing the new teacher',
					password: '123',
					role: 'teacher',
					schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
					userName: 'newTeacher',
				},
			}).should(response => {
				expect(response.status).to.eq(422)
				expect(response.body.message).to.equal('Missing input')
			})
		})

		it('should return 422 with message - missing userName', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {
					bio: 'Testing the new teacher',
					bsn: '999998997',
					email: 'new@teacher.com',
					password: '123',
					role: 'teacher',
					schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
				},
			}).should(response => {
				expect(response.status).to.eq(422)
				expect(response.body.message).to.equal('Missing input')
			})
		})

		it('should return 422 with message - missing role', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {
					bio: 'Testing the new teacher',
					bsn: '999998997',
					email: 'new@teacher.com',
					password: '123',
					schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
					userName: 'newTeacher',
				},
			}).should(response => {
				expect(response.status).to.eq(422)
				expect(response.body.message).to.equal('Missing input')
			})
		})

		it('should return 422 with message - missing password', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {
					bio: 'Testing the new teacher',
					bsn: '999998997',
					email: 'new@teacher.com',
					role: 'teacher',
					schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
					userName: 'newTeacher',
				},
			}).should(response => {
				expect(response.status).to.eq(422)
				expect(response.body.message).to.equal('Missing input')
			})
		})

		it('should return 422 with message - missing bio', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {
					bsn: '999998997',
					email: 'new@teacher.com',
					password: '123',
					role: 'teacher',
					schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
					userName: 'newTeacher',
				},
			}).should(response => {
				expect(response.status).to.eq(422)
				expect(response.body.message).to.equal('Missing input')
			})
		})

		it('should return 422 with message - missing bsn', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {
					bio: 'Testing the new teacher',
					email: 'new@teacher.com',
					password: '123',
					role: 'teacher',
					schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
					userName: 'newTeacher',
				},
			}).should(response => {
				expect(response.status).to.eq(422)
				expect(response.body.message).to.equal('Missing input')
			})
		})

		it('should return 422 with message - missing school id', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {
					bio: 'Testing the new teacher',
					bsn: '999998997',
					email: 'new@teacher.com',
					password: '123',
					role: 'teacher',
					userName: 'newTeacher',
				},
			}).should(response => {
				expect(response.status).to.eq(422)
				expect(response.body.message).to.equal('Missing input')
			})
		})

		it('should return 400 with message - not unique email', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {
					bio: 'Testing the new teacher',
					bsn: '999998997',
					email: 'test@teacher.com',
					password: '123',
					role: 'teacher',
					schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
					userName: 'newTeacher',
				},
			}).should(response => {
				expect(response.status).to.eq(400)
				expect(response.body.message).contains(
					'Unique constraint failed on the fields: '
				)
				expect(response.body.message).contains('email')
			})
		})

		it('should return 400 with message - invalid school id', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {
					bio: 'Testing the new teacher',
					bsn: '999998997',
					email: 'test@teacher.com',
					password: '123',
					role: 'teacher',
					schoolId: '00000000-0000-0000-0000-000000000000',

					userName: 'newTeacher',
				},
			}).should(response => {
				expect(response.status).to.eq(400)
				expect(response.body.message).contains('Invalid')
			})
		})

		it('should return 200 with new teacher', function () {
			cy.request({
				method: 'POST',
				url: '/auth/signup',
				failOnStatusCode: false,
				body: {
					bio: 'Testing the new teacher',
					bsn: '999998997',
					email: 'new@teacher.com',
					password: '123',
					role: 'teacher',
					schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',

					userName: 'newTeacher',
				},
			}).should(response => {
				expect(response.status).to.eq(200)
				expect(response.body).to.have.all.keys('token', 'data', 'message')
				expect(response.body.data).to.have.all.keys(
					'subjects',
					'user',
					'overview'
				)
				expect(response.body.data.user.email).to.equal('new@teacher.com')
				expect(response.body.data.user.bsn).to.equal('999998997')
				expect(response.body.data.user.role).to.equal('TEACHER')
				expect(response.body.data.user.profile.bio).to.equal(
					'Testing the new teacher'
				)
				expect(response.body.message).to.equal('Welcome')
			})
		})
	})
})
