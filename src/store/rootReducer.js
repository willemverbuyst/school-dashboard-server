import { combineReducers } from 'redux';
import appState from './appState/reducer';
import student from './student/reducer';
import teacher from './teacher/reducer';
import questions from './questions/reducer';
import test from './test/reducer';
import testResults from './testResults/reducer';
import overviewStudent from './overviewStudent/reducer';
import overViewTeacher from './overviewTeacher/reducer';

export default combineReducers({
  appState,
  student,
  teacher,
  questions,
  test,
  testResults,
  overviewStudent,
  overViewTeacher,
});
