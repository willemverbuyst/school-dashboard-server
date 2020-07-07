import {
  FETCH_RESULTS_FOR_SUBJECT,
  REMOVE_RESULTS_FOR_SUBJECT,
} from './actions';

const initialState = {
  all: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESULTS_FOR_SUBJECT:
      return { ...state, all: action.payload };

    case REMOVE_RESULTS_FOR_SUBJECT:
      return initialState;

    default:
      return state;
  }
};
