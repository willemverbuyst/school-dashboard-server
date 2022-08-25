import { ReactElement } from 'react'
import { BarChart } from '../../../components/charts'
import { Col } from 'antd'

interface IScore {
  length: number
  result: number
}

interface ISubject {
  name: string
  id: number
}

interface IProps {
  scores: IScore[]
  subjects: ISubject[]
}

export default function BarChartMain({
  scores,
  subjects,
}: IProps): ReactElement {
  const data = scores.map(({ result }) => result)
  const color: Array<string> = []
  for (let i = 0; i < data.length; i++) color.push('#FF5C84')
  const labels = subjects.map(({ name }) => name)

  return (
    <Col style={{ width: 450, paddingBottom: 80 }}>
      {scores.length ? (
        <BarChart
          data={data}
          color={color}
          labels={labels}
          title={`AVERAGES PER SUBJECT`}
          max={100}
        />
      ) : (
        <p>THERE IS NOT ENOUGH DATA YET TO DISPLAY BAR CHART</p>
      )}
    </Col>
  )
}
