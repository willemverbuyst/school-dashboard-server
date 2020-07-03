import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';

export const FETCH_OVERVIEW_FOR_SUBJECT = 'FETCH_OVERVIEW_FOR_SUBJECT';
export const FETCH_OVERVIEW_FOR_STUDENT = 'FETCH_OVERVIEW_FOR_STUDENT';

export function subjectsFetched(results) {
  return {
    type: FETCH_OVERVIEW_FOR_SUBJECT,
    payload: results,
  };
}
export function studentsFetched(results) {
  return {
    type: FETCH_OVERVIEW_FOR_STUDENT,
    payload: results,
  };
}

export function getSubjectForOverview(id) {
  return async function thunk(dispatch, getState) {
    const token = getState().teacher.token;
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/data/subjects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const results = response.data;

      dispatch(subjectsFetched(results));
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
  };
}

export function getStudentForOverview(id) {
  return async function thunk(dispatch, getState) {
    const token = getState().teacher.token;
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/data/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const results = response.data;

      dispatch(studentsFetched(results));
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
  };
}
