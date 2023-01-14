import { Button } from "antd";
import { useHistory } from "react-router-dom";

export function LoginButton(): JSX.Element {
  const history = useHistory();

  const goTo = () => {
    history.push("/login");
  };

  return <Button onClick={goTo}>Login</Button>;
}
