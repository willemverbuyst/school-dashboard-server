import {
  DatabaseOutlined,
  HomeOutlined,
  LaptopOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import renderSideBarNav from '../../../components/sidebar/renderSideBarNav'
import { adminTasks } from '../../../constants/constants'
import { useUser } from '../../../hooks'

const { SubMenu } = Menu
const { Sider } = Layout

export default function SidebarForTeacher(): ReactElement {
  const history = useHistory()
  const { user } = useUser()
  const subjects = user?.data.subjects.data
  const students = user?.data.user.teacher?.students
  const studentsForNavigation = students?.map((student) => ({
    id: student.id,
    name: student.user?.userName,
  }))
  const teacherId = user?.data.user.id

  const goTo = (goto: string) => {
    history.push(goto)
  }

  const renderSubjectsNav = (subjects) =>
    subjects.map(({ id, name }) =>
      renderSideBarNav('sub2', `/teachers/${teacherId}/subjects/${id}`, name)
    )

  const renderStudentsNav = (students) =>
    students.map(({ id, name }) =>
      renderSideBarNav('sub3', `/teachers/${teacherId}/students/${id}`, name)
    )

  const renderAdminTasksNav = () =>
    adminTasks.map(({ id, name }) =>
      renderSideBarNav('sub4', `/teachers/${teacherId}/admintasks/${id}`, name)
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
          onClick={() => goTo('/teachers/1')}
        >
          Home
        </Menu.Item>
        {subjects && studentsForNavigation ? (
          <>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Subjects">
              {renderSubjectsNav(subjects)}
            </SubMenu>
            <SubMenu key="sub3" icon={<UserOutlined />} title="Students">
              {renderStudentsNav(studentsForNavigation)}
            </SubMenu>
            <SubMenu key="sub4" icon={<DatabaseOutlined />} title="Admin">
              {renderAdminTasksNav()}
            </SubMenu>
          </>
        ) : null}
      </Menu>
    </Sider>
  )
}
