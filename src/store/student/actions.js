import { apiUrl } from '../../config/constants';
import axios from 'axios';

import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from '../appState/actions';

export const LOGIN_SUCCESS_STUDENT = 'LOGIN_SUCCESS_STUDENT';
export const LOG_OUT_STUDENT = 'LOG_OUT_STUDENT';

const loginSuccessStudent = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS_STUDENT,
    payload: userWithToken,
  };
};

export const logOutStudent = () => ({ type: LOG_OUT_STUDENT });

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
