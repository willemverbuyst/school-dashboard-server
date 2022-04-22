import React, { ReactElement, useState } from 'react'
import { Col, Row } from 'antd'
import BarChartTest from '../../../components/charts/BarChartTest'
import SortAndSelect from '../../../components/SortAndSelect'

interface ISubject {
	name: string
	score: number
	subjectId: number
	tests: number
}

interface IProps {
	results: ISubject[]
}

const BarChartTestsStudent: React.FC<IProps> = ({
	results,
}: IProps): ReactElement => {
	const [selectionTests, setSelectionTests] = useState('name')
	const [selectSubjectTests, setSelectSubjectTests] = useState('')

	const sortedResults =
		selectionTests === 'name'
			? [...results].sort((a, b) => a.name.localeCompare(b.name))
			: [...results].sort((a, b) => b.tests - a.tests)

	const filteredResults = selectSubjectTests
		? sortedResults.filter(result => result.name === selectSubjectTests)
		: sortedResults

	return (
		<>
			{/* <SortAndSelect
        title="TESTS DONE"
        radio1="Name"
        radio2="Amount"
        onChangeRadio={setSelectionTests}
        value={selectSubjectTests || undefined}
        onChangeSelection={setSelectSubjectTests}
        results={results}
        selectStudentData={selectSubjectTests}
        onClick={() => setSelectSubjectTests('')}
        placeholder="Select a subject"
        textBtn="All subjects"
      /> */}
			<Row justify={'space-around'}>
				{filteredResults.map(({ tests, name }, i) => (
					<Col key={i} style={{ width: 350, paddingBottom: 80 }}>
						<BarChartTest
							data={[tests]}
							color={['#8F1CB8']}
							labels={[`${name}: ${tests} tests`]}
							title={``}
						/>
					</Col>
				))}
			</Row>
		</>
	)
}

export default BarChartTestsStudent
