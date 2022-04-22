import { ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from 'antd'
import BarChartTestsStudent from './BarChartTestsStudents'
import DoughnutChartStudent from './DoughnutChartStudents'
import { useTeacherGuard } from '../../../hooks/guard'

const { Content } = Layout

export default function TestResultsForStudent(): ReactElement {
	const { studentid } = useParams<{ studentid: string }>()
	const testResultsForStudent = []
	const { guardPage } = useTeacherGuard()

	useEffect(() => guardPage())

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			<BarChartTestsStudent results={testResultsForStudent} />
			<DoughnutChartStudent results={testResultsForStudent} />
		</Content>
	)
}
