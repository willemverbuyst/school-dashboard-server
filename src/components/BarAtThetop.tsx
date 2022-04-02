import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { Layout } from 'antd'
import { useUser } from '../pages/auth/hooks/useUser'

const { Header } = Layout

const BarAtThetop = (): ReactElement => {
	const { user } = useUser()

	const renderLoginLogout = (): ReactElement => {
		return user ? <LogoutButton /> : <LoginButton />
	}

	const renderWelcome = (): ReactElement | null => {
		return user ? <div>Welcome {user?.data.user.userName}!</div> : null
	}

	const renderDate = (): string => {
		return moment().format('MMMM Do YYYY, dddd')
	}

	return (
		<Header
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				color: '#fff',
			}}
			className="header"
		>
			<Link
				style={{
					color: '#fff',
					fontFamily: 'Sriracha',
					fontSize: '2rem',
					transform: 'rotate(-5deg)',
				}}
				to="/"
			>
				Dashboard
			</Link>
			{renderDate()}
			{renderWelcome()}
			{renderLoginLogout()}
		</Header>
	)
}

export default BarAtThetop
