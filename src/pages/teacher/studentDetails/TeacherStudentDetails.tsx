import { ReactElement, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Layout } from 'antd'
import BarChartTestsStudent from './BarChartTestsStudents'
import DoughnutChartStudent from './DoughnutChartStudents'

const { Content } = Layout

const TeacherStudentDetails = (): ReactElement => {
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
		<Layout>
			<Layout style={{ padding: '24px', minHeight: '92vh' }}>
				<Content className="site-layout-background">
					{results && subjects ? (
						<>
							<BarChartTestsStudent results={results} />
							<DoughnutChartStudent results={results} />
						</>
					) : null}
				</Content>
			</Layout>
		</Layout>
	)
}

export default TeacherStudentDetails
