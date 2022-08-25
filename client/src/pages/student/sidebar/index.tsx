import {
  BarChartOutlined,
  ExperimentOutlined,
  HomeOutlined,
} from '@ant-design/icons'
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

  const renderSubjectNav = (subjects) =>
    subjects.map(({ id, name }) =>
      renderSideBarNav('sub2', `/students/${studentId}/subjects/${id}`, name)
    )

  const renderTestNav = (subjects) =>
    subjects.map(({ id, name }) =>
      renderSideBarNav(
        'sub3',
        `/students/${studentId}/subjects/${id}/test`,
        name
      )
    )

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
        <SubMenu key="sub2" icon={<BarChartOutlined />} title="Subjects">
          {renderSubjectNav(subjects)}
        </SubMenu>
        <SubMenu key="sub3" icon={<ExperimentOutlined />} title="Test">
          {renderTestNav(subjects)}
        </SubMenu>
      </Menu>
    </Sider>
  )
}
