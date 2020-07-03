export const selectSubjectOverview = (state) => {
  return state.overViewTeacher.subjects;
};

export const selectStudentOverview = (state) => {
  return state.overViewTeacher.students;
};
