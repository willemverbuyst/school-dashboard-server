import { FETCH_MC_QUESTIONS } from './actions';

const initialState = {
  all: [],
};

export default (state = initialState, action) => {
  console.log('what is in the payload:', action.payload);
  switch (action.type) {
    case FETCH_MC_QUESTIONS:
      console.log('in the switch', action.payload);
      return { ...state, all: state.all.concat(action.payload) };

    default:
      return state;
  }
};
