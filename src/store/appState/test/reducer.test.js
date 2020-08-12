import reducer from '../reducer';
import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from '../actions';

describe('userReducer', () => {
  const initialState = {
    loading: false,
    message: null,
  };
  describe('if given no state and a random action', () => {
    test('returns the inital state', () => {
      const newState = reducer(undefined, { type: 'RANDOM' });
      expect(newState).toEqual(initialState);
    });
  });
  describe('when given a SET_MESSAGE action type', () => {
    test('returns a new state with the payload containing correct values', () => {
      const newMessage = 'test_message';
      const action = { type: SET_MESSAGE, payload: newMessage };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({ loading: false, message: newMessage });
      expect(newState.message).toBe(newMessage);
      expect(newState.loading).toBe(false);
    });
  });
  describe('when given a CLEAR_MESSAGE action type', () => {
    test('returns a new state with the message set to null', () => {
      const action = { type: CLEAR_MESSAGE };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({ loading: false, message: null });
      expect(newState.message).toBeNull;
      expect(newState.loading).toBe(false);
    });
  });
});
