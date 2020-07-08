import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { selectTeacherToken } from './selectors';
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from '../appState/actions';
import { removeOverviewTeacher } from '../overviewTeacher/actions';
import { removeListOfQuestions } from '../questions/actions';

export const LOGIN_SUCCESS_TEACHER = 'LOGIN_SUCCESS_TEACHER';
export const TOKEN_STILL_VALID_TEACHER = 'TOKEN_STILL_VALID_TEACHER';
export const LOG_OUT_TEACHER = 'LOG_OUT_TEACHER';
export const ADD_SUBJECT = 'ADD_SUBJECT';

const loginSuccessTeacher = (teacherWithToken) => {
  return {
    type: LOGIN_SUCCESS_TEACHER,
    payload: teacherWithToken,
  };
};

const tokenStillValid = (teacherWithoutToken) => ({
  type: TOKEN_STILL_VALID_TEACHER,
  payload: teacherWithoutToken,
});

const addSubject = (subject) => ({
  type: ADD_SUBJECT,
  payload: subject,
});

export const logOutTeacher = () => ({ type: LOG_OUT_TEACHER });

export const loginTeacher = (email, password, isStudent) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
        isStudent,
      });

      dispatch(loginSuccessTeacher(response.data));
      dispatch(showMessageWithTimeout('success', false, 'welcome back!', 1500));
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

export const getTeacherWithStoredToken = () => {
  return async (dispatch, getState) => {
    const token = selectTeacherToken(getState());

    if (token === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/teacher`, {
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
      dispatch(logOutTeacher());
      dispatch(appDoneLoading());
    }
  };
};

export const teacherLoggingOut = () => {
  return function thunk(dispatch, getState) {
    dispatch(logOutTeacher());
    dispatch(removeOverviewTeacher());
    dispatch(removeListOfQuestions());
  };
};

export const createTeacher = (isStudent, name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        isStudent,
        name,
        email,
        password,
      });

      dispatch(loginSuccessTeacher(response.data));
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
};

export function createSubject(subject) {
  return async function thunk(dispatch, getState) {
    const token = getState().teacher.token;
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/subject`,
        {
          subject,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(addSubject(response.data.newSubject));
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
