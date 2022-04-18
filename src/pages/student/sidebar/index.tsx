import { useHistory } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { ReactElement } from 'react'
import renderSideBarNav from '../../../components/sidebar/renderSideBarNav'
import { useUser } from '../../../hooks'

const { Sider } = Layout

const StudentSideBar = (): ReactElement => {
	const history = useHistory()
	const { user } = useUser()

	const goTo = (goto: string) => {
		history.push(goto)
	}

	const renderSubjectNav = () =>
		renderSideBarNav(
			'sub1',
			`/students/${user?.data.user.id}/subjects`,
			user?.data.subjects.data || []
		)

	return (
		<Sider width={250}>
			<Menu
				mode="inline"
				defaultSelectedKeys={['1']}
				style={{ height: '100%', borderRight: 0 }}
			>
				<Menu.Item
					key="1"
					onClick={() => goTo(`/students/${user?.data.user.id}`)}
				>
					Home
				</Menu.Item>
				{user?.data.subjects ? renderSubjectNav() : null}
			</Menu>
		</Sider>
	)
}

export default StudentSideBar
