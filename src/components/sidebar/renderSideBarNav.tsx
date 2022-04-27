import { Menu } from 'antd'
import { useHistory } from 'react-router-dom'

function SideBarNav(
  key: string,
  path: string,
  name: string
  // navsToRender: Array<{ name: string; id: number | string }>
) {
  const history = useHistory()
  const goTo = (goto: string): void => {
    history.push(goto)
  }

  return (
    <Menu.Item key={`${key}-${name}`} onClick={() => goTo(path)}>
      {name.toUpperCase()}
    </Menu.Item>
  )
}

export default SideBarNav
