import { LOGIN_SUCCESS_STUDENT } from './actions';

const initialState = {
  token: localStorage.getItem('student_token'),
  name: null,
  email: null,
  id: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS_STUDENT:
      localStorage.setItem('student_token', action.payload.token);
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
