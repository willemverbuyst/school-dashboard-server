import {
  FETCH_OVERVIEW_FOR_SUBJECT,
  FETCH_OVERVIEW_FOR_STUDENT,
} from './actions';

const initialState = {
  subjects: [],
  students: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OVERVIEW_FOR_SUBJECT:
      return { ...state, subjects: action.payload };
    case FETCH_OVERVIEW_FOR_STUDENT:
      return { ...state, subjects: action.payload };
    default:
      return state;
  }
};
