import {
  DatabaseOutlined,
  HomeOutlined,
  LaptopOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu, MenuProps } from 'antd'
import { useHistory } from 'react-router-dom'
import { adminTasks } from '../../../constants/constants'
import { useUser } from '../../../hooks'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

export default function SidebarForTeacher(): JSX.Element | null {
  const history = useHistory()
  const { user } = useUser()
  const subjects = user?.data.subjects.data ?? []
  const students = user?.data.user.teacher?.students ?? []
  const studentsForNavigation = students.map(student => ({
    id: student.id,
    name: student.user?.userName,
  }))
  const teacherId = user?.data.user.id

  const subjectsForMenu = getItem(
    'Subjects',
    'sub2',
    <LaptopOutlined />,
    subjects.map(({ id, name }) => getItem(name, `sub2-${id}`))
  )

  const studentsForMenu = getItem(
    'Students',
    'sub3',
    <UserOutlined />,
    studentsForNavigation.map(({ id, name }) => getItem(name, `sub3-${id}`))
  )

  const adminTasksForMenu = getItem(
    'Admin',
    'sub4',
    <DatabaseOutlined />,
    adminTasks.map(({ id, name }) => getItem(name, `sub4-${id}`))
  )

  const items = [
    getItem('Home', 'sub1', <HomeOutlined />),
    subjectsForMenu,
    studentsForMenu,
    adminTasksForMenu,
  ]

  const goTo: MenuProps['onClick'] = (e: any) => {
    let path: string = '/home'

    if (e.key === 'sub1') {
      path = `/teachers/${teacherId}`
    }

    if (e.keyPath[1] === 'sub2') {
      path = `/teachers/${teacherId}/subjects/${e.key.replace('sub2-', '')}`
    }

    if (e.keyPath[1] === 'sub3') {
      path = `/teachers/${teacherId}/students/${e.key.replace('sub3-', '')}`
    }

    if (e.keyPath[1] === 'sub4') {
      path = `/teachers/${teacherId}/admintasks/${e.key.replace('sub4-', '')}`
    }

    history.push(path)
  }

  if (!teacherId) {
    return null
  }

  return (
    <Sider width={250}>
      <Menu
        items={items}
        style={{ height: '100%', borderRight: 0 }}
        mode="inline"
        onClick={goTo}
      />
    </Sider>
  )
}
