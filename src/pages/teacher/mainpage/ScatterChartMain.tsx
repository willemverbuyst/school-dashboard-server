import React, { ReactElement } from 'react'
import ScatterChart from '../../../components/charts/ScatterChart'
import { Col } from 'antd'
import moment from 'moment'

interface ITest {
	subjectId: number
	scores: number
	createdAt: string
}

export type Coordinates = {
	x: string
	y: number
}

interface IProps {
	tests: ITest[]
}

const ScatterChartMain: React.FC<IProps> = ({
	tests,
}: IProps): ReactElement => {
	const color: string[] = []
	const data: Coordinates[] = []
	tests.forEach(({ scores, createdAt }) => {
		color.push('#4BC0E7')
		data.push({ x: moment(createdAt).format(), y: scores })
	})

	return (
		<Col style={{ width: 450, paddingBottom: 80 }}>
			{tests.length ? (
				<ScatterChart
					data={data}
					color={color}
					title={
						'AT WHAT TIME OF THE DAY STUDENTS TAKE TESTS AND WHAT IS THEIR SCORE'
					}
				/>
			) : (
				<p>THERE IS NOT ENOUGH DATA YET TO DISPLAY SCATTER CHART</p>
			)}
		</Col>
	)
}

export default ScatterChartMain
