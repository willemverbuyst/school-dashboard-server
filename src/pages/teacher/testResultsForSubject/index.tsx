import { ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from 'antd'
import BarChartTests from './BarChartTestsSubject'
import DoughnutChartSubject from './DoughnutChartSubject'
import { useTeacherGuard, useTestResultForSubject } from '../../../hooks'

const { Content } = Layout

export default function TestResultsForSubject(): ReactElement {
	const { subjectid } = useParams<{ subjectid: string }>()
	const { testResultsForSubject, setSubjectId } = useTestResultForSubject()
	const results = testResultsForSubject || []
	const { guardPage } = useTeacherGuard()

	useEffect(() => guardPage())

	useEffect(() => {
		setSubjectId(subjectid)
	}, [subjectid, setSubjectId])

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			<DoughnutChartSubject results={results} />
			<BarChartTests results={results} />
		</Content>
	)
}
