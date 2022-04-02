import { ReactElement, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Layout } from 'antd'
import BarChartTests from './BarChartTestsSubject'
import DoughnutChartSubject from './DoughnutChartSubject'
import { useUser } from '../../auth/hooks/useUser'

const { Content } = Layout

const TeacherSubjectDetails = (): ReactElement => {
	const history = useHistory()
	const { user } = useUser()
	const { subjectid } = useParams<{ subjectid: string }>()
	const results = []

	useEffect(() => {
		if (!user || user.token === null || user.data.user.role !== 'TEACHER') {
			history.push('/')
		}
	}, [user, history])

	return (
		<Layout>
			<Layout style={{ padding: '24px', minHeight: '92vh' }}>
				<Content className="site-layout-background">
					<BarChartTests results={results} />
					<DoughnutChartSubject results={results} />
				</Content>
			</Layout>
		</Layout>
	)
}

export default TeacherSubjectDetails
