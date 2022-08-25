import { Layout } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStudentGuard, useSubjectForStudent, useUser } from '../../../hooks'
import BarChartDetails from './BarChartDetails'
import DoughnutChartDetails from './DoughnutChartDetails'

const { Content } = Layout

export default function StudentSubject() {
  const { subjectid } = useParams<{ subjectid: string }>()
  const { user } = useUser()
  const { subject, setSubjectId } = useSubjectForStudent()
  const subjects = user?.data.subjects.data || []
  const { studentGuard } = useStudentGuard()

  useEffect(() => studentGuard())

  useEffect(() => {
    setSubjectId(subjectid)
  }, [subjectid, setSubjectId])

  return (
    <Content
      className="site-layout-content"
      style={{ padding: 45, height: 80, overflow: 'scroll' }}
    >
      {subject ? (
        <>
          <DoughnutChartDetails results={subject} />
          <BarChartDetails
            results={subject}
            subjects={subjects}
            subjectId={subjectid}
          />
        </>
      ) : (
        <p>no tests and results found</p>
      )}
    </Content>
  )
}
