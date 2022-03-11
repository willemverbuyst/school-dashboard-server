import axios from 'axios';
import { apiUrl } from '../../constants/constants';
import {
  appLoading,
  appDoneLoading,
  setMessage,
  showMessageWithTimeout,
} from '../appState/actions';

export const FETCH_MC_QUESTIONS = 'FETCH_MC_QUESTIONS';
export const REMOVE_MC_QUESTIONS = 'REMOVE_MC_QUESTIONS';

export function questionsFetched(questions) {
  return {
    type: FETCH_MC_QUESTIONS,
    payload: questions,
  };
}

export function removeQuestions() {
  return {
    type: REMOVE_MC_QUESTIONS,
  };
}

export function getMcQuestionsForTest(id) {
  return async function thunk(dispatch, getState) {
    const token = getState().student.token;
    dispatch(appLoading());
    dispatch(removeQuestions());
    try {
      const response = await axios.get(`${apiUrl}/questions/3qtest/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const questions = response.data;

      dispatch(questionsFetched(questions));
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

export function submitTest(subjectId, test) {
  const { question1, question2, question3, answer1, answer2, answer3 } = test;
  return async function thunk(dispatch, getState) {
    const token = getState().student.token;
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/questions/3qtest`,
        {
          q1: question1,
          q2: question2,
          q3: question3,
          a1: answer1,
          a2: answer2,
          a3: answer3,
          subjectId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(showMessageWithTimeout('success', true, response.data.message));
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
