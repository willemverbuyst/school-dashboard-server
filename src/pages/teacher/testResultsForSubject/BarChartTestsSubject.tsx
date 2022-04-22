import React, { ReactElement, useState } from 'react'
import { Col, Row } from 'antd'
import BarChartTest from '../../../components/charts/BarChartTest'
import SortAndSelect from '../../../components/SortAndSelect'

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

const BarChartTestsSubject: React.FC<IProps> = ({
	results,
}: IProps): ReactElement => {
	const [selectionTests, setSelectionTests] = useState('name')
	const [selectStudentTests, setSelectStudentTests] = useState('')

	const sortedResults =
		selectionTests === 'name'
			? [...results].sort((a, b) => a.userName.localeCompare(b.userName))
			: [...results].sort(
					(a, b) => b.score / b.numberOfTests - a.score / a.numberOfTests
			  )

	const filteredResults = selectStudentTests
		? sortedResults.filter(result => result.userName === selectStudentTests)
		: sortedResults

	return (
		<>
			<SortAndSelect
				title="TESTS DONE"
				radio1="Name"
				radio2="Amount"
				onChangeRadio={setSelectionTests}
				value={selectStudentTests || undefined}
				onChangeSelection={setSelectStudentTests}
				results={results}
				selectStudentData={selectStudentTests}
				onClick={() => setSelectStudentTests('')}
				placeholder="Select a student"
				textBtn="All students"
			/>
			<Row justify={'space-around'}>
				{filteredResults.map(({ numberOfTests, score, userName }, i) => (
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
		</>
	)
}

export default BarChartTestsSubject
