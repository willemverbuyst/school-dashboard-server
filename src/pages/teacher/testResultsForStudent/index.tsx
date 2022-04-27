import { Layout } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SortAndSelect from '../../../components/SortAndSelect'
import { useTeacherGuard, useTestResultForStudent } from '../../../hooks'
import BarChartTestsStudent from './BarChartTestsStudents'
import DoughnutChartStudent from './DoughnutChartStudents'

const { Content } = Layout

export default function TestResultsForStudent(): ReactElement {
  const { studentid } = useParams<{ studentid: string }>()
  const { data, setStudentId } = useTestResultForStudent()
  const results = data || []

  const { guardPage } = useTeacherGuard()

  const [selectionAverage, setSelectionAverage] = useState('name')
  const [selectSubjectAverage, setSelectSubjectAverage] = useState('')

  const sortedResults =
    selectionAverage === 'name'
      ? [...results].sort((a, b) => a.userName.localeCompare(b.userName))
      : [...results].sort((a, b) => b.score - a.score)

  const filteredResults = selectSubjectAverage
    ? sortedResults.filter((result) => result.userName === selectSubjectAverage)
    : sortedResults

  useEffect(() => guardPage())

  useEffect(() => {
    setStudentId(studentid)
  }, [studentid, setStudentId])

  return (
    <Content className="site-layout-content" style={{ padding: 90 }}>
      <SortAndSelect
        title="AVERAGE GRADES"
        radio1="Name"
        radio2="Score"
        onChangeRadio={setSelectionAverage}
        value={selectSubjectAverage || undefined}
        onChangeSelection={setSelectSubjectAverage}
        results={results}
        selectStudentData={selectSubjectAverage}
        onClick={() => setSelectSubjectAverage('')}
        placeholder="Select a student"
        textBtn="All students"
      />
      <DoughnutChartStudent results={filteredResults} />
      <BarChartTestsStudent results={filteredResults} />
    </Content>
  )
}
