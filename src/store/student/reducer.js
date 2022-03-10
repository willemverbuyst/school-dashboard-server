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
  subjects: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS_STUDENT:
      const { data, token } = action.payload;
      localStorage.setItem('student_token', token);
      return {
        ...state,
        token: token,
        name: data.student.name,
        email: data.student.email,
        id: data.student.id,
        subjects: data.subjects,
      };

    case TOKEN_STILL_VALID_STUDENT:
      return {
        ...state,
        token: token,
        name: data.student.name,
        email: data.student.email,
        id: data.student.id,
        subjects: data.subjects,
      };

    case LOG_OUT_STUDENT:
      localStorage.removeItem('student_token');
      return { ...initialState, token: null };

    default:
      return state;
  }
};

export default studentReducer;
