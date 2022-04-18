import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Layout, Row } from 'antd'
import DoughnutChartDetails from './DoughnutChartDetails'
import BarChartDetails from './BarChartDetails'
import NumberOfTests from './NumberOfTests'
import TestButton from './TestButton'
import { useSubjectForStudent, useUser } from '../../../hooks'

const { Content } = Layout

export default function StudentSubject() {
	const { subjectid } = useParams<{ subjectid: string }>()
	const history = useHistory()
	const { user } = useUser()
	const { subject, subjectId, setSubjectId } = useSubjectForStudent()
	const subjects = user?.data.subjects.data || []

	useEffect(() => {
		if (!user || user.token === null) {
			history.push('/')
		}
	}, [user, history])

	useEffect(() => {
		setSubjectId(subjectid)
	}, [subjectid, setSubjectId])

	const goTo = (): void => {
		history.push(
			`/students/${user?.data.user.student?.id}/subjects/${subjectId}/test`
		)
	}

	return (
		<Content className="site-layout-content">
			{subject ? (
				<>
					<Row justify="space-around">
						<NumberOfTests results={subject} />
						<DoughnutChartDetails results={subject} />
						<TestButton goTo={goTo} />
					</Row>
					<Row justify="center">
						<BarChartDetails
							results={subject}
							subjects={subjects}
							subjectId={subjectid}
						/>
					</Row>
				</>
			) : (
				<p>no tests and results found</p>
			)}
		</Content>
	)
}
