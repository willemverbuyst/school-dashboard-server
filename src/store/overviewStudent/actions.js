import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';

export const FETCH_RESULTS_FOR_STUDENT_MAIN = 'FETCH_RESULTS_FOR_STUDENT_MAIN';

export function resultsFetched(questions) {
  return {
    type: FETCH_RESULTS_FOR_STUDENT_MAIN,
    payload: questions,
  };
}

export function getResultsForStudentMain(id) {
  return async function thunk(dispatch, getState) {
    const token = getState().student.token;
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/data/main`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const questions = response.data;

      dispatch(resultsFetched(questions));
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
