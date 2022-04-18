import { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout } from 'antd'
import BarChartTests from './BarChartTestsSubject'
import DoughnutChartSubject from './DoughnutChartSubject'
import { useUser } from '../../../hooks'

const { Content } = Layout

export default function TeacherSubject(): ReactElement {
	const history = useHistory()
	const { user } = useUser()
	// const { subjectid } = useParams<{ subjectid: string }>()
	const results = []

	useEffect(() => {
		if (!user || user.token === null || user.data.user.role !== 'TEACHER') {
			history.push('/')
		}
	}, [user, history])

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			<BarChartTests results={results} />
			<DoughnutChartSubject results={results} />
		</Content>
	)
}
