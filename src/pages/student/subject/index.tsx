import { Layout, Row } from 'antd'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSubjectForStudent, useUser } from '../../../hooks'
import BarChartDetails from './BarChartDetails'
import DoughnutChartDetails from './DoughnutChartDetails'
import NumberOfTests from './NumberOfTests'

const { Content } = Layout

export default function StudentSubject() {
  const { subjectid } = useParams<{ subjectid: string }>()
  const history = useHistory()
  const { user } = useUser()
  const { subject, setSubjectId } = useSubjectForStudent()
  const subjects = user?.data.subjects.data || []

  useEffect(() => {
    if (!user || user.token === null) {
      history.push('/')
    }
  }, [user, history])

  useEffect(() => {
    setSubjectId(subjectid)
  }, [subjectid, setSubjectId])

  return (
    <Content
      className="site-layout-content"
      style={{ padding: 90, height: 80, overflow: 'scroll' }}
    >
      {subject ? (
        <>
          <Row justify="space-around">
            <NumberOfTests results={subject} />
            <DoughnutChartDetails results={subject} />
          </Row>
          <Row justify="center">
            <BarChartDetails
              results={subject}
              subjects={subjects}
              subjectId={subjectid}
            />
          </Row>
        </>
      ) : (
        <p>no tests and results found</p>
      )}
    </Content>
  )
}
