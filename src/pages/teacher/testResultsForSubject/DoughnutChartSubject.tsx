import { ReactElement } from 'react'
import { Col, Row } from 'antd'
import DoughnutChart from '../../../components/charts/DoughnutChart'
import { TestResult } from './BarChartTestsSubject'

interface IProps {
	results: TestResult[]
}

export default function DoughnutChartSubject({
	results,
}: IProps): ReactElement {
	return (
		<Row justify={'space-around'}>
			{results.map(({ numberOfTests, score, userName }, i) => (
				<Col key={i} style={{ width: 350, paddingBottom: 80 }}>
					<DoughnutChart
						data={[
							(score / 3) * numberOfTests,
							100 - (score / 3) * numberOfTests,
						]}
						color={['#008080', '#eee']}
						title={`${userName} ${Math.round((score / 3) * numberOfTests)}%`}
					/>
				</Col>
			))}
		</Row>
	)
}
