import { Layout } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SortAndSelect from '../../../components/SortAndSelect'
import { useTeacherGuard, useTestResultForSubject } from '../../../hooks'
import BarChartTests from './BarChartTestsSubject'
import DoughnutChartSubject from './DoughnutChartSubject'

export interface TestResult {
  numberOfTests: number
  score: number
  studentId: string
  subjectName: string
  userName: string
}

const { Content } = Layout

export default function TestResultsForSubject(): ReactElement {
  const { subjectid } = useParams<{ subjectid: string }>()
  const { testResultsForSubject, setSubjectId } = useTestResultForSubject()
  const results: Array<TestResult> = testResultsForSubject || []
  const { guardPage } = useTeacherGuard()
  const selectOptions = results.map((result) => result.userName)

  const [selectionAverage, setSelectionAverage] = useState('name')
  const [selectStudentAverage, setSelectStudentAverage] = useState('')

  const sortedResults =
    selectionAverage === 'name'
      ? [...results].sort((a, b) => a.userName.localeCompare(b.userName))
      : [...results].sort((a, b) => b.score - a.score)

  const filteredResults = selectStudentAverage
    ? sortedResults.filter((result) => result.userName === selectStudentAverage)
    : sortedResults

  useEffect(() => guardPage())

  useEffect(() => {
    setSubjectId(subjectid)
  }, [subjectid, setSubjectId])

  return results.length ? (
    <Content className="site-layout-content" style={{ padding: 90 }}>
      <SortAndSelect
        title="AVERAGE GRADES"
        radio1="Name"
        radio2="Score"
        onChangeRadio={setSelectionAverage}
        value={selectStudentAverage || undefined}
        onChangeSelection={setSelectStudentAverage}
        results={selectOptions}
        selectStudentData={selectStudentAverage}
        onClick={() => setSelectStudentAverage('')}
        placeholder="Select a student"
        textBtn="All students"
      />
      <DoughnutChartSubject results={filteredResults} />
      <BarChartTests results={filteredResults} />
    </Content>
  ) : (
    <p>No results yet</p>
  )
}
