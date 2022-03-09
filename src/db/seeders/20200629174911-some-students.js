'use strict'
const {
	students: studentSeed,
} = require('../../../build/db/dummyData/students')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('students', studentSeed, {})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('students', null, {})
	},
}
