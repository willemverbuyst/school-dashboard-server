'use strict'
const {
	teachers: teacherSeed,
} = require('../../../build/db/dummyData/teachers')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('teachers', teacherSeed, {})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('teachers', null, {})
	},
}
