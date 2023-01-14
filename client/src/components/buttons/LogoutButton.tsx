import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { useLogout } from "../../hooks/";

export function LogoutButton(): JSX.Element {
  const history = useHistory();
  const logout = useLogout();

  const handleLogOut = async () => {
    await logout();
    history.push("/");
  };

  return <Button onClick={handleLogOut}>Logout</Button>;
}
