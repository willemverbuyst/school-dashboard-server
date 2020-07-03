export const selectSubjectOverview = (state) => {
  return state.overViewTeacher.subjects;
};

export const selectStudentOverview = (state) => {
  return state.overViewTeacher.students;
};

export const selectMainOverview = (state) => {
  return state.overViewTeacher.main.scores;
};

export const selectMainOverviewScatter = (state) => {
  return state.overViewTeacher.main.tests;
};
