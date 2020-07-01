import { combineReducers } from 'redux';
import appState from './appState/reducer';
import schoolInfo from './schoolInfo/reducer';
import student from './student/reducer';
import teacher from './teacher/reducer';

export default combineReducers({
  appState,
  schoolInfo,
  student,
  teacher,
});
