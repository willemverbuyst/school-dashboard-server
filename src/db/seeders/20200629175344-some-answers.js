'use strict'
const { answers: answerSeed } = require('../../../build/db/dummyData/answers')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('answers', answerSeed, {})
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('answers', null, {})
	},
}
