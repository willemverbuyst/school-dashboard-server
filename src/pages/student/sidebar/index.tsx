import { HomeOutlined, LaptopOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import renderSideBarNav from '../../../components/sidebar/renderSideBarNav'
import { useUser } from '../../../hooks'

const { SubMenu } = Menu
const { Sider } = Layout

export default function SidebarForStudent(): ReactElement {
  const history = useHistory()
  const { user } = useUser()
  const studentId = user?.data.user.id
  const subjects = user?.data.subjects.data || []

  const goTo = (goto: string) => {
    history.push(goto)
  }

  const renderSubjectNav = () =>
    renderSideBarNav('sub2', `/students/${studentId}/subjects`, subjects)

  return (
    <Sider width={250}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item
          key="sub1"
          icon={<HomeOutlined />}
          onClick={() => goTo(`/students/${user?.data.user.id}`)}
        >
          Home
        </Menu.Item>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Subjects">
          {renderSubjectNav()}
        </SubMenu>
      </Menu>
    </Sider>
  )
}
