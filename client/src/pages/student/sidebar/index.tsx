import {
  BarChartOutlined,
  ExperimentOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import { Layout, Menu, MenuProps } from 'antd'
import { useHistory } from 'react-router-dom'
import { getItem } from '../../../components/sidebar/util'

import { useUser } from '../../../hooks'

const { Sider } = Layout

export default function SidebarForStudent(): JSX.Element | null {
  const history = useHistory()
  const { user } = useUser()
  const studentId = user?.data.user.id
  const subjects = user?.data.subjects.data || []

  const subjectsForMenu = getItem(
    'Subjects',
    'sub2',
    <BarChartOutlined />,
    subjects.map(({ id, name }) => getItem(name, `sub2-${id}`))
  )

  const testForMenu = getItem(
    'Test',
    'sub3',
    <ExperimentOutlined />,
    subjects.map(({ id, name }) => getItem(name, `sub3-${id}`))
  )

  const items = [
    getItem('Home', 'sub1', <HomeOutlined />),
    subjectsForMenu,
    testForMenu,
  ]

  const goTo: MenuProps['onClick'] = e => {
    let path: string = '/home'

    if (e.key === 'sub1') {
      path = `/students/${studentId}`
    }

    if (e.keyPath[1] === 'sub2') {
      path = `/students/${studentId}/subjects/${e.key.replace('sub2-', '')}`
    }

    if (e.keyPath[1] === 'sub3') {
      path = `/students/${studentId}/subjects/${e.key.replace(
        'sub3-',
        ''
      )}/test`
    }

    history.push(path)
  }

  if (!studentId) {
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
