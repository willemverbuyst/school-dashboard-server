import 'cypress-localstorage-commands'

Cypress.Commands.add('saveTokenTeacher', () => {
  cy.request('POST', '/auth/login', {
    email: 'test@teacher.com',
    password: '123',
  })
    .its('body')
    .then(response => {
      cy.setLocalStorage('teacher_token', response.token)
    })
})
