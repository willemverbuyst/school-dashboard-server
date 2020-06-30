import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessage } from '../store/appState/selectors';
import { clearMessage } from '../store/appState/actions';
import { Alert } from 'antd';

export default function AlertBox() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const showMessage = message !== null;
  if (!showMessage) return null;

  return (
    <Alert
      type={message.variant}
      closable={message.dismissable}
      onClose={message.dismissable ? () => dispatch(clearMessage()) : null}
      message={message.text}
    />
  );
}
