import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { useAuth } from '../pages/auth/hooks/useAuth';

const LogoutButton = (): ReactElement => {
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogOut = () => {
    logout();
    history.push('/');
  };

  return <Button onClick={handleLogOut}>Logout</Button>;
};

export default LogoutButton;
