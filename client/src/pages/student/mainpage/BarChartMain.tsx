import { ReactElement } from 'react'
import { BarChart } from '../../../components/charts'

interface Subject {
  name: string
  id: number
}

interface IProps {
  averages: number[]
  subjects: Subject[]
}

const BarChartMain: React.FC<IProps> = ({
  averages,
  subjects,
}: IProps): ReactElement => {
  const subjectLabel = subjects.map((subject) => subject.name)
  const color: string[] = []
  for (let i = 0; i < averages.length; i++) color.push('#008080')

  return (
    <BarChart
      data={averages}
      labels={subjectLabel}
      color={color}
      title={'AVERAGE SCORE PER SUBJECT'}
      max={100}
    />
  )
}

export default BarChartMain
