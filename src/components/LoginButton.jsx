import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

export default function LogoutButton() {
  const history = useHistory();

  const goTo = () => {
    history.push('/login');
  };

  return <Button onClick={goTo}>Login</Button>;
}
