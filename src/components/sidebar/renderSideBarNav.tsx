import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';

function SideBarNav(
  key: string,
  path: string,
  navsToRender: Array<{ name: string; id: number }>
) {
  const history = useHistory();
  const goTo = (goto: string): void => {
    history.push(goto);
  };

  return navsToRender.map(({ name, id }, i) => (
    <Menu.Item key={`${key}-${i + 1}`} onClick={() => goTo(`${path}/${id}`)}>
      {name.toUpperCase()}
    </Menu.Item>
  ));
}

export default SideBarNav;
