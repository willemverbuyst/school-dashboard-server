describe('School-daschboard api', () => {
  context('POST /auth/signup (student)', () => {
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
          bsn: '999991632',
          bio: 'Testing the new student',
          password: '123',
          role: 'student',
          schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
          teacherId: '5fd57f7f-37c8-4ce6-9b3c-ef52d66757c3',
          userName: 'newStudent',
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
          bio: 'Testing the new student',
          bsn: '999991632',
          email: 'new@student.com',
          password: '123',
          role: 'student',
          schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
          teacherId: '5fd57f7f-37c8-4ce6-9b3c-ef52d66757c3',
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
          bio: 'Testing the new student',
          bsn: '999991632',
          email: 'new@student.com',
          password: '123',
          schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
          teacherId: '5fd57f7f-37c8-4ce6-9b3c-ef52d66757c3',
          userName: 'newStudent',
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
          bio: 'Testing the new student',
          bsn: '999991632',
          email: 'new@student.com',
          role: 'student',
          schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
          teacherId: '5fd57f7f-37c8-4ce6-9b3c-ef52d66757c3',
          userName: 'newStudent',
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
          bsn: '999991632',
          email: 'new@student.com',
          password: '123',
          role: 'student',
          schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
          teacherId: '5fd57f7f-37c8-4ce6-9b3c-ef52d66757c3',
          userName: 'newStudent',
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
          bio: 'Testing the new student',
          email: 'new@student.com',
          password: '123',
          role: 'student',
          schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
          teacherId: '5fd57f7f-37c8-4ce6-9b3c-ef52d66757c3',
          userName: 'newStudent',
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
          bio: 'Testing the new student',
          bsn: '999991632',
          email: 'new@student.com',
          password: '123',
          role: 'student',
          teacherId: '5fd57f7f-37c8-4ce6-9b3c-ef52d66757c3',
          userName: 'newStudent',
        },
      }).should(response => {
        expect(response.status).to.eq(422)
        expect(response.body.message).to.equal('Missing input')
      })
    })

    it('should return 422 with message - missing teacher id', function () {
      cy.request({
        method: 'POST',
        url: '/auth/signup',
        failOnStatusCode: false,
        body: {
          bio: 'Testing the new student',
          bsn: '999991632',
          email: 'new@student.com',
          password: '123',
          role: 'student',
          schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
          userName: 'newStudent',
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
          bio: 'Testing the new student',
          bsn: '999991632',
          email: 'test@student.com',
          password: '123',
          role: 'student',
          schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
          teacherId: '5fd57f7f-37c8-4ce6-9b3c-ef52d66757c3',
          userName: 'newStudent',
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
          bio: 'Testing the new student',
          bsn: '999991632',
          email: 'test@student.com',
          password: '123',
          role: 'student',
          schoolId: '00000000-0000-0000-0000-000000000000',
          teacherId: '5fd57f7f-37c8-4ce6-9b3c-ef52d66757c3',
          userName: 'newStudent',
        },
      }).should(response => {
        expect(response.status).to.eq(400)
        expect(response.body.message).contains('Invalid')
      })
    })

    it('should return 400 with message - invalid teacher id', function () {
      cy.request({
        method: 'POST',
        url: '/auth/signup',
        failOnStatusCode: false,
        body: {
          bio: 'Testing the new student',
          bsn: '999991632',
          email: 'test@student.com',
          password: '123',
          role: 'student',
          schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
          teacherId: '00000000-0000-0000-0000-000000000000',
          userName: 'newStudent',
        },
      }).should(response => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.contain('Invalid')
      })
    })

    it('should return 200 with new student', function () {
      cy.request({
        method: 'POST',
        url: '/auth/signup',
        failOnStatusCode: false,
        body: {
          bio: 'Testing the new student',
          bsn: '999991632',
          email: 'new@student.com',
          password: '123',
          role: 'student',
          schoolId: '8d7016a5-1cca-4da4-8808-a56a25a96bd9',
          teacherId: '5fd57f7f-37c8-4ce6-9b3c-ef52d66757c3',
          userName: 'newStudent',
        },
      }).should(response => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.all.keys('token', 'data', 'message')
        expect(response.body.data).to.have.all.keys(
          'subjects',
          'user',
          'overview'
        )
        expect(response.body.message).to.equal('Welcome')
      })
    })
  })
})
