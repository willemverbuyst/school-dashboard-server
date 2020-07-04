import {
  LOG_OUT_TEACHER,
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
} from './actions';

const initialState = {
  token: localStorage.getItem('teacher_token'),
  name: null,
  email: null,
  id: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS_TEACHER:
      localStorage.setItem('teacher_token', action.payload.token);
      return { ...state, ...action.payload };
    case LOG_OUT_TEACHER:
      localStorage.removeItem('teacher_token');
      return { ...initialState, token: null };
    case TOKEN_STILL_VALID_TEACHER:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
