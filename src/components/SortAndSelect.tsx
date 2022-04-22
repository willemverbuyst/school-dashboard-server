import React, { ReactElement } from 'react'
import { Row, Radio, Select, Button } from 'antd'
import { TestResult } from '../pages/teacher/testResultsForSubject/BarChartTestsSubject'

const { Option } = Select

interface Student {
	name: string
	score: number
	subjectId: number
	tests: number
}

interface ISelectorProps {
	title: string
	radio1: string
	radio2: string
	onChangeRadio: any
	value: string | undefined
	onChangeSelection: any
	results: TestResult[]
	selectStudentData: string
	onClick: any
	placeholder: string
	textBtn: string
}

const SortAndSelect: React.FC<ISelectorProps> = ({
	title,
	radio1,
	radio2,
	onChangeRadio,
	value,
	onChangeSelection,
	results,
	selectStudentData,
	onClick,
	placeholder,
	textBtn,
}: ISelectorProps): ReactElement => {
	return (
		<Row style={{ paddingBottom: 35 }}>
			{title}
			<Radio.Group
				size="small"
				style={{ marginLeft: 40 }}
				onChange={e => onChangeRadio(e.target.value)}
			>
				<Radio.Button style={{ marginRight: 5 }} value={radio1.toLowerCase()}>
					{radio1}
				</Radio.Button>
				<Radio.Button style={{ marginRight: 5 }} value={radio2.toLowerCase()}>
					{radio2}
				</Radio.Button>
			</Radio.Group>
			<Select
				size="small"
				style={{ width: 160, marginRight: 5 }}
				placeholder={placeholder}
				value={value}
				onChange={e => onChangeSelection(e)}
			>
				{results.map(({ userName }, i) => (
					<Option key={i} value={userName}>
						{userName}
					</Option>
				))}
			</Select>
			{selectStudentData ? (
				<Button size="small" onClick={onClick}>
					{textBtn}
				</Button>
			) : null}
		</Row>
	)
}

export default SortAndSelect
