import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutStudent } from '../store/student/actions';
import { Button } from 'antd';

export default function LogoutButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutStudent());
    history.push('/');
  };

  return <Button onClick={handleLogOut}>Logout</Button>;
}
