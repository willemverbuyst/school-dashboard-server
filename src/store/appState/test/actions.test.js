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
import axios from 'axios';

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
  describe('if given clear message', () => {
    test('should return an action object with type CLEAR_MESSAGE and no payload', () => {
      const expected = {
        type: CLEAR_MESSAGE,
      };
      expect(clearMessage()).toEqual(expected);
    });
    test('should return an action object with type CLEAR_MESSAGE and payload undefined', () => {
      const expected = {
        type: CLEAR_MESSAGE,
      };
      expect(clearMessage().payload).toBeUndefined();
    });
  });
  describe('if given apploading', () => {
    test('should return an action type APP_LOADING', () => {
      const expected = {
        type: APP_LOADING,
      };
      expect(appLoading()).toEqual(expected);
    });
    test('should return an action type LOADING and no payload', () => {
      const expected = {
        type: APP_LOADING,
      };
      expect(appLoading().payload).toBeUndefined();
    });
  });
  describe('if given appDoneloading', () => {
    test('should return an action type APP_DONE_LOADING', () => {
      const expected = {
        type: APP_DONE_LOADING,
      };
      expect(appDoneLoading()).toEqual(expected);
    });
    test('should return an action type LOADING and no payload', () => {
      const expected = {
        type: APP_DONE_LOADING,
      };
      expect(appDoneLoading().payload).toBeUndefined();
    });
  });
});

jest.mock('axios');

describe('showMessageWithTimeout', () => {
  describe('when called', () => {
    test('should dispatch an action set message', async () => {
      const variant = 'test_variant';
      const dismissable = 'test_dismissable';
      const text = 'test_text';
      const timeOutMilliSeconds = 1000;
      axios.get.mockImplementationOnce(() => Promise.resolve());
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      showMessageWithTimeout(
        variant,
        dismissable,
        text,
        timeOutMilliSeconds
      )(dispatch);
      expect(dispatch).toHaveBeenCalledWith(
        setMessage(variant, dismissable, text)
      );
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
