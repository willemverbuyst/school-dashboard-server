import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';

export interface IStudent {
  name: string;
  id: number;
}

export interface ISubject {
  name: string;
  id: number;
}

function SideBarNav(
  key: string,
  path: string,
  navsToRender: ISubject[] | IStudent[] | string
) {
  const history = useHistory();
  const goTo = (goto: string): void => {
    history.push(goto);
  };

  if (typeof navsToRender === 'string') {
    return 'hello';
  }
  return navsToRender.map(({ name, id }, i) => (
    <Menu.Item key={`${key}-${i + 1}`} onClick={() => goTo(`${path}/${id}`)}>
      {name.toUpperCase()}
    </Menu.Item>
  ));
}

export default SideBarNav;
