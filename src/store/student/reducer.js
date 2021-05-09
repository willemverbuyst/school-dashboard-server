import {
  LOGIN_SUCCESS_STUDENT,
  TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
} from './actions';

const initialState = {
  token: localStorage.getItem('student_token'),
  name: null,
  email: null,
  id: null,
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS_STUDENT:
      localStorage.setItem('student_token', action.payload.token);
      return { ...state, ...action.payload };

    case TOKEN_STILL_VALID_STUDENT:
      return { ...state, ...action.payload };

    case LOG_OUT_STUDENT:
      localStorage.removeItem('student_token');
      return { ...initialState, token: null };

    default:
      return state;
  }
};
