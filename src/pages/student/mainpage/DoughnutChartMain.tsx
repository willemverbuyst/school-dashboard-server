import { ReactElement } from 'react'
import DoughnutChart from '../../../components/charts/DoughnutChart'

interface IProps {
	averages: number[]
}

const DoughnutChartMain: React.FC<IProps> = ({
	averages,
}: IProps): ReactElement => {
	const generalScore = Math.round(
		averages.reduce((a, b) => a + b * 1, 0) / averages.length
	)
	return generalScore ? (
		<DoughnutChart
			data={[generalScore, 100 - generalScore]}
			color={['#8F1CB8', '#eee']}
			title={`YOUR HAVE A GENERAL SCORE OF ${generalScore}%`}
		/>
	) : (
		<p>YOU DON'T HAVE ENOUGH DATA YET TO DISPLAY AVERAGE</p>
	)
}

export default DoughnutChartMain
