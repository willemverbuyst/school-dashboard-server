import { getAllSchools } from "./getAllSchools.query";
import { getSchool } from "./getSchool.query";
import { getSchoolWithStudents } from "./getSchoolWithStudents.query";
import { getSchoolWithTeachers } from "./getSchoolWithTeachers.query";

export const schoolQueries = {
  getAllSchools,
  getSchool,
  getSchoolWithStudents,
  getSchoolWithTeachers,
};
