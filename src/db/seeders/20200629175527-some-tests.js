'use strict'
const { tests: testSeed } = require('../../../build/db/dummyData/tests')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('tests', testSeed, {})
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tests', null, {})
	},
}
