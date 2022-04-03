import './commands'

declare global {
	namespace Cypress {
		interface Chainable {
			saveTokenTeacher(): Chainable<Element>
			saveTokenStudent(): Chainable<Element>
		}
	}
}
