import { combineReducers } from 'redux';
import appState from './appState/reducer';
import schoolInfo from './schoolInfo/reducer';

export default combineReducers({
  schoolInfo,
  appState,
});
