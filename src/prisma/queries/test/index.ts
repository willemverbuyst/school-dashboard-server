import { createTest } from './createTest.query'
import { getAllTestsForTeacher } from './getAllTestsForTeacher.query'
import { getTestForStudentAndSubject } from './getTestsForStudentAndSubject.query'
import { getTestsForStudent } from './getTestsForStudent.query'

export const testQueries = {
	createTest,
	getAllTestsForTeacher,
	getTestForStudentAndSubject,
	getTestsForStudent,
}