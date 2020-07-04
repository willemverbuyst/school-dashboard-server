import {
  FETCH_RESULTS_FOR_STUDENT_MAIN,
  REMOVE_RESULTS_FOR_STUDENT_MAIN,
} from './actions';

const initialState = {
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESULTS_FOR_STUDENT_MAIN:
      return { ...state, all: action.payload };
    case REMOVE_RESULTS_FOR_STUDENT_MAIN:
      return initialState;
    default:
      return state;
  }
};
