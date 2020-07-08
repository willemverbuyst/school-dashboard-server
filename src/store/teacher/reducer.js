import {
  LOG_OUT_TEACHER,
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
  ADD_SUBJECT,
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

    case ADD_SUBJECT:
      if (state.subjects) {
        return { ...state, subjects: [...state.subjects, action.payload] };
      } else {
        return { ...state, subjects: [action.payload] };
      }

    default:
      return state;
  }
};
