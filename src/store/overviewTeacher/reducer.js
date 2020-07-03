import { FETCH_OVERVIEW_FOR_SUBJECT } from './actions';

const initialState = {
  subjects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OVERVIEW_FOR_SUBJECT:
      return { ...state, all: action.payload };
    default:
      return state;
  }
};
