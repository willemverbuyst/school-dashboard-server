import { FETCH_RESULTS_FOR_SUBJECT } from './actions';

const initialState = {
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESULTS_FOR_SUBJECT:
      return { ...state, all: action.payload };
    default:
      return state;
  }
};
