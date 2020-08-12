import axios from 'axios';
import { apiUrl } from '../../config/constants';
import {
  appLoading,
  appDoneLoading,
  setMessage,
  showMessageWithTimeout,
} from '../appState/actions';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const REMOVE_QUESTIONS = 'REMOVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function questionsFetched(questions) {
  return {
    type: FETCH_QUESTIONS,
    payload: questions,
  };
}

export function removeListOfQuestions() {
  return {
    type: REMOVE_QUESTIONS,
  };
}

export function addQuestionToList(question) {
  return { type: ADD_QUESTION, payload: question };
}

export function getQuestionsForSubject(id) {
  return async function thunk(dispatch, getState) {
    const token = getState().teacher.token;
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/questions/${id}`, {
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

export function createQuestion(
  subjectId,
  question,
  answer1,
  answer2,
  answer3,
  answer4
) {
  return async function thunk(dispatch, getState) {
    const token = getState().teacher.token;
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/questions`,
        {
          subjectId,
          question,
          answer1,
          answer2,
          answer3,
          answer4,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(showMessageWithTimeout('success', true, response.data.message));
      dispatch(
        addQuestionToList({
          text: question,
          answers: [
            { text: answer1, correct: true },
            { text: answer2, correct: false },
            { text: answer3, correct: false },
            { text: answer4, correct: false },
          ],
        })
      );
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
