import React, { ReactElement } from 'react'
import { Col, Row } from 'antd'
import BarChartTest from '../../../components/charts/BarChartTest'

export interface TestResult {
	numberOfTests: number
	score: number
	studentId: string
	subjectName: string
	userName: string
}

interface IProps {
	results: Array<TestResult>
}

export default function BarChartTestsSubject({
	results,
}: IProps): ReactElement {
	return (
		<Row justify={'space-around'}>
			{results.map(({ numberOfTests, score, userName }, i) => (
				<Col key={i} style={{ width: 350, paddingBottom: 80 }}>
					<BarChartTest
						data={[score]}
						color={['#008080']}
						labels={[`${userName}: ${numberOfTests} tests`]}
						title={''}
					/>
				</Col>
			))}
		</Row>
	)
}
