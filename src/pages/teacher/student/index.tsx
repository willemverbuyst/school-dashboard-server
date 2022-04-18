import { ReactElement, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Layout } from 'antd'
import BarChartTestsStudent from './BarChartTestsStudents'
import DoughnutChartStudent from './DoughnutChartStudents'

const { Content } = Layout

export default function TeacherStudent(): ReactElement {
	const history = useHistory()
	const token = ''
	const { studentid } = useParams<{ studentid: string }>()
	const results = []
	const subjects = []

	useEffect(() => {
		if (token === null) {
			history.push('/')
		}
	})

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			{results && subjects ? (
				<>
					<BarChartTestsStudent results={results} />
					<DoughnutChartStudent results={results} />
				</>
			) : null}
		</Content>
	)
}
