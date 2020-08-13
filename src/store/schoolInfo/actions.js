import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';

export const FETCH_TEACHERS = 'FETCH_TEACHERS';

export function teachersFetched(teachers) {
  return {
    type: FETCH_TEACHERS,
    payload: teachers,
  };
}

export async function fetchAllTeachers(dispatch, getState) {
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/school/teachers`, {});
    const teachers = response.data;

    dispatch(teachersFetched(teachers));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage('danger', true, error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage('danger', true, error.message));
    }
    dispatch(appDoneLoading());
  }
}
