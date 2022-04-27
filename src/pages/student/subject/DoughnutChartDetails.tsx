import { Col, Row } from 'antd'
import { ReactElement } from 'react'
import { DoughnutChart } from '../../../components/charts'

interface IResult {
  at: string
  score: number
  subject: number
}

interface IProps {
  results: IResult[]
}

const DoughnutChartDetails: React.FC<IProps> = ({
  results,
}: IProps): ReactElement => {
  const data = results.map(({ score }) => score)
  const average = data.length
    ? Math.round((data.reduce((a, b) => a + b, 0) / (data.length * 3)) * 100)
    : 0
  const color = ['#A026FF', '#eee']

  return (
    <Col>
      <Row justify="center" style={{ marginBottom: '48px' }}>
        <Col style={{ width: 450 }}>
          <DoughnutChart
            color={color}
            data={[average, 100 - average]}
            title={`YOUR AVERAGE OVER ${results.length} TESTS IS ${average}%`}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default DoughnutChartDetails
