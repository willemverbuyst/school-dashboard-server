import React, { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Row } from 'antd'
// import BarChartMain from './BarChartMain'
import LineChartMain from './LineChartMain'
import PieChartMain from './PieChartMain'
import ScatterChartMain from './ScatterChartMain'
import Spinner from '../../../components/spinner'
import { useUser } from '../../../hooks'

const { Content } = Layout

export default function TeacherMainPage(): ReactElement {
	const { user } = useUser()
	const tests = user?.data?.overview?.data?.testsWithSummedScores || []
	const history = useHistory()
	const subjects = user?.data.subjects

	useEffect(() => {
		if (!user || user.token === null || user.data.user.role !== 'TEACHER') {
			history.push('/')
		}
	}, [user, history])

	const renderCharts = (): JSX.Element => {
		return subjects ? (
			// return mainPageData && tests && subjects ? (
			<>
				TEACHER
				<Row justify="space-around">
					{/* <BarChartMain scores={mainPageData} subjects={subjects} /> */}
					<PieChartMain tests={tests} />
				</Row>
				<Row justify="space-around">
					<LineChartMain tests={tests} />
					<ScatterChartMain tests={tests} />
				</Row>
			</>
		) : (
			<Spinner />
		)
	}

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			{renderCharts()}
		</Content>
	)
}
