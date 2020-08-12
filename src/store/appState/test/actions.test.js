import {
  appLoading,
  appDoneLoading,
  clearMessage,
  setMessage,
  showMessageWithTimeout,
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from '../actions';

describe('appState', () => {
  describe('if given set message with text, variant and dismissable', () => {
    test('should return an object containing type SET_MESSAGE and payload variant, dismissable and text', () => {
      const variant = 'test_variant';
      const dismissable = 'test_dismissable';
      const text = 'test_text';
      const expected = {
        type: SET_MESSAGE,
        payload: { variant, dismissable, text },
      };
      expect(setMessage(variant, dismissable, text)).toEqual(expected);
    });
    test('should return an action object with type SET_MESSAGE and payload the same as message, variant passed', () => {
      const variant = 'test_variant';
      const dismissable = 'test_dismissable';
      const text = 'test_text';
      const expected = {
        type: SET_MESSAGE,
        payload: { variant, dismissable, text },
      };
      expect(setMessage(variant, dismissable, text).payload).toEqual(
        expected.payload
      );
    });
  });
});
