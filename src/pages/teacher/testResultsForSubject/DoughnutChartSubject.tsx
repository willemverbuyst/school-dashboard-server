import React, { ReactElement, useState } from 'react'
import { Col, Row } from 'antd'
import DoughnutChart from '../../../components/charts/DoughnutChart'
import SortAndSelect from '../../../components/SortAndSelect'
import { TestResult } from './BarChartTestsSubject'

interface IProps {
	results: TestResult[]
}

const DoughnutChartSubject: React.FC<IProps> = ({
	results,
}: IProps): ReactElement => {
	const [selectionAverage, setSelectionAverage] = useState('name')
	const [selectStudentAverage, setSelectStudentAverage] = useState('')

	const sortedResults =
		selectionAverage === 'name'
			? [...results].sort((a, b) => a.userName.localeCompare(b.userName))
			: [...results].sort((a, b) => b.score - a.score)

	const filteredResults = selectStudentAverage
		? sortedResults.filter(result => result.userName === selectStudentAverage)
		: sortedResults

	return (
		<>
			<SortAndSelect
				title="AVERAGE GRADES"
				radio1="Name"
				radio2="Average"
				onChangeRadio={setSelectionAverage}
				value={selectStudentAverage || undefined}
				onChangeSelection={setSelectStudentAverage}
				results={results}
				selectStudentData={selectStudentAverage}
				onClick={() => setSelectStudentAverage('')}
				placeholder="Select a student"
				textBtn="All students"
			/>
			<Row justify={'space-around'}>
				{filteredResults.map(({ numberOfTests, score, userName }, i) => (
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
		</>
	)
}

export default DoughnutChartSubject
