import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

const LogoutButton = (): ReactElement => {
  const history = useHistory();

  const goTo = () => {
    history.push('/login');
  };

  return <Button onClick={goTo}>Login</Button>;
};

export default LogoutButton;
