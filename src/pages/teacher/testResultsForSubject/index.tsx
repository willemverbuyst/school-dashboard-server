import { ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from 'antd'
import BarChartTests from './BarChartTestsSubject'
import DoughnutChartSubject from './DoughnutChartSubject'
import { useTeacherGuard } from '../../../hooks/guard'

const { Content } = Layout

export default function TestResultsForSubject(): ReactElement {
	// const { subjectid } = useParams<{ subjectid: string }>()
	const results = []
	const { guardPage } = useTeacherGuard()

	useEffect(() => guardPage())

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			<BarChartTests results={results} />
			<DoughnutChartSubject results={results} />
		</Content>
	)
}
