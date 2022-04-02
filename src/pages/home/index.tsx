import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import BarChartHome from './BarChartHome'
import LineChartHome from './LineChartHome'
import PolarChartHome from './PolarChartHome'
import { Layout, Row, Col } from 'antd'
import { useUser } from '../auth/hooks/useUser'

const { Content } = Layout

const Home = () => {
	const history = useHistory()
	const { user } = useUser()
	const roleForUrl = user?.data.user.role?.toLowerCase() + 's'

	useEffect(() => {
		if (user) {
			history.push(`/${roleForUrl}/${user?.data.user.id}`)
		}
	}, [roleForUrl, user, history])

	return (
		<Content className="site-layout-content">
			<Row justify="space-around">
				<Col>
					<div style={{ width: '35vw', height: '35vh' }}>
						<BarChartHome />
					</div>
				</Col>
			</Row>
			<Row justify="space-around">
				<Col>
					<div style={{ width: '35vw', height: '35vh' }}>
						<PolarChartHome />
					</div>
				</Col>
				<Col>
					<div style={{ width: '35vw', height: '35vh' }}>
						<LineChartHome />
					</div>
				</Col>
			</Row>
		</Content>
	)
}

export default Home
