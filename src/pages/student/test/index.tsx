import { Button, Layout } from 'antd'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'

const { Content } = Layout

interface TestResult {
  question1: number
  question2: number
  question3: number
  answer1: string
  answer2: string
  answer3: string
}

export default function StudentTest() {
  const history = useHistory()
  const { subjectid } = useParams<{ subjectid: string }>()
  const subjects = []
  const questions = []
  const [MCResults, setMCResults] = useState<TestResult>({
    question1: 0,
    question2: 0,
    question3: 0,
    answer1: '0',
    answer2: '0',
    answer3: '0',
  })
  const [testDone, setTestDone] = useState(false)
  const [blockNavigation, setBlockNavigation] = useState(true)
  const studentId = ''

  const onPick = (event: any, questionNumber: number, questionId: number) => {
    if (questionNumber === 1) {
      event === 1 || event % 4 === 1
        ? setMCResults({ ...MCResults, question1: questionId, answer1: '1' })
        : setMCResults({ ...MCResults, question1: questionId, answer1: '0' })
    } else if (questionNumber === 2) {
      event === 1 || event % 4 === 1
        ? setMCResults({ ...MCResults, question2: questionId, answer2: '1' })
        : setMCResults({ ...MCResults, question2: questionId, answer2: '0' })
    } else {
      event === 1 || event % 4 === 1
        ? setMCResults({ ...MCResults, question3: questionId, answer3: '1' })
        : setMCResults({ ...MCResults, question3: questionId, answer3: '0' })
    }
  }

  const onFinish = () => {
    if (studentId) {
      setTestDone(true)
      setMCResults({ ...MCResults, answer1: '0', answer2: '0', answer3: '0' })
      setBlockNavigation(false)
    }
  }

  const doAnotherTest = () => {
    setBlockNavigation(true)
    setTestDone(false)
  }

  const goToMain = () => {
    history.push(`/students/${studentId}/subjects/${subjectid}`)
  }

  const renderMCQ = () => {
    if (questions && subjects) {
      return (
        <>
          {subjectid}
          {questions.map(({ text, answers, id }, i) => (
            <MultipleChoiceQuestion
              key={i}
              text={text}
              answers={answers}
              onChange={onPick}
              questionNumber={i + 1}
              questionId={id}
            />
          ))}
          {!testDone ? (
            <Button
              style={{
                width: 160,
                backgroundColor: '#B81D9D',
                border: 'none',
                color: '#fff',
              }}
              onClick={onFinish}
            >
              Finish
            </Button>
          ) : null}
          {testDone ? (
            <>
              <p>{'You want to take another test?'.toUpperCase()}</p>
              <Button
                style={{
                  width: 160,
                  backgroundColor: '#4BC0E7',
                  border: 'none',
                  color: '#fff',
                  marginRight: 20,
                }}
                onClick={doAnotherTest}
              >
                yes
              </Button>
              <Button
                style={{
                  width: 160,
                  backgroundColor: '#B81D9D',
                  border: 'none',
                  color: '#fff',
                }}
                onClick={goToMain}
              >
                no
              </Button>
            </>
          ) : null}
        </>
      )
    }
  }

  return (
    <>
      {/* <NavigationPrompt
        beforeConfirm={(clb) => {
          console.log('submit')
          clb()
        }}
        when={blockNavigation}
      >
        {({ onConfirm, onCancel }) => (
          <Modal
            visible
            title="Are you sure you want to leave?"
            onCancel={onCancel}
            onOk={onConfirm}
          >
            <div>
              If you leave this page your test score will be set to zero!
            </div>
          </Modal>
        )}
      </NavigationPrompt> */}

      <Content className="site-layout-content" style={{ padding: 90 }}>
        {renderMCQ()}
      </Content>
    </>
  )
}
