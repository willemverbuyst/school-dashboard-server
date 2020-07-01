import axios from 'axios';
import { apiUrl } from '../../config/constants';
import {
  appLoading,
  appDoneLoading,
  setMessage,
  // showMessageWithTimeout,
} from '../appState/actions';

export const FETCH_MC_QUESTIONS = 'FETCH_QUESTIONS';

export function questionsFetched(questions) {
  console.log('is this thing called?', questions);
  return {
    type: FETCH_MC_QUESTIONS,
    payload: questions,
  };
}

export function getMcQuestionsForTest(id) {
  console.log('action is called');
  return async function thunk(dispatch, getState) {
    const token = getState().student.token;
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/questions/3qtest/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const questions = response.data;

      dispatch(questionsFetched(questions));
      console.log(questions);
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
