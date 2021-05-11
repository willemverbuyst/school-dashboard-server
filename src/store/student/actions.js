import { apiUrl } from '../../constants/constants';
import axios from 'axios';
import { selectStudentToken } from './selectors';
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from '../appState/actions';
import { removeResults } from '../overviewStudent/actions';
import { removeDetailsStudent } from '../testResults/actions';
import { removeQuestions } from '../test/actions';

export const LOGIN_SUCCESS_STUDENT = 'LOGIN_SUCCESS_STUDENT';
export const TOKEN_STILL_VALID_STUDENT = 'TOKEN_STILL_VALID_STUDENT';
export const LOG_OUT_STUDENT = 'LOG_OUT_STUDENT';

const loginSuccessStudent = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS_STUDENT,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID_STUDENT,
  payload: userWithoutToken,
});

export const loginStudent = (email, password, isStudent) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
        isStudent,
      });

      dispatch(loginSuccessStudent(response.data));
      dispatch(showMessageWithTimeout('success', false, 'Welcome back!', 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage('error', true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage('error', true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getStudentWithStoredToken = () => {
  return async (dispatch, getState) => {
    const token = selectStudentToken(getState());

    if (token === null) return;

    dispatch(appLoading());
    try {
      // if token check if valid
      const response = await axios.get(`${apiUrl}/student`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(logOutStudent());
      dispatch(appDoneLoading());
    }
  };
};

export const studentLoggingOut = () => {
  return function thunk(dispatch, getState) {
    dispatch(logOutStudent());
    dispatch(removeResults());
    dispatch(removeDetailsStudent());
    dispatch(removeQuestions());
  };
};

export const logOutStudent = () => ({ type: LOG_OUT_STUDENT });

export function createStudent(isStudent, name, email, password, teacherId) {
  return async function thunk(dispatch, getState) {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        isStudent,
        name,
        email,
        password,
        teacherId,
      });

      dispatch(loginSuccessStudent(response.data));
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
