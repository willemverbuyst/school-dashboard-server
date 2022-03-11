import {
  FETCH_RESULTS_FOR_SUBJECT,
  REMOVE_RESULTS_FOR_SUBJECT,
} from './actions';

const initialState = {
  all: null,
};

const testResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESULTS_FOR_SUBJECT:
      return { ...state, all: action.payload.data };

    case REMOVE_RESULTS_FOR_SUBJECT:
      return initialState;

    default:
      return state;
  }
};

export default testResultReducer;
