import {
  FETCH_OVERVIEW_FOR_SUBJECT,
  FETCH_OVERVIEW_FOR_STUDENT,
  FETCH_OVERVIEW_FOR_MAIN,
  REMOVE_OVERVIEW,
} from './actions';

const initialState = {
  subjects: [],
  students: [],
  main: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OVERVIEW_FOR_SUBJECT:
      return { ...state, subjects: action.payload };
    case FETCH_OVERVIEW_FOR_STUDENT:
      return { ...state, students: action.payload };
    case FETCH_OVERVIEW_FOR_MAIN:
      return { ...state, main: action.payload };
    case REMOVE_OVERVIEW:
      return initialState;
    default:
      return state;
  }
};
