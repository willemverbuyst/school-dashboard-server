import { Button, Form, Layout, Modal, Radio, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import NavigationPrompt from 'react-router-navigation-prompt'
import { useGetTest, useStudentGuard, useUser } from '../../../hooks'

const { Content } = Layout

export default function StudentTest() {
  const history = useHistory()
  const [form] = Form.useForm()
  const { subjectid } = useParams<{ subjectid: string }>()
  const { mcQuestions, setSubjectId } = useGetTest()
  const { user } = useUser()
  const studentId = user?.data.user.student?.id
  const questions = mcQuestions || []

  const [testDone, setTestDone] = useState(false)
  const [blockNavigation, setBlockNavigation] = useState(true)
  const { studentGuard } = useStudentGuard()

  useEffect(() => studentGuard())

  useEffect(() => {
    setSubjectId(subjectid)
  }, [subjectid, setSubjectId])

  const handleSubmit = (input: any) => {
    setTestDone(true)
    console.log('done', input)
    setBlockNavigation(false)
  }

  const doAnotherTest = () => {
    setBlockNavigation(true)
    setTestDone(false)
  }

  const goToMain = () => {
    history.push(`/students/${studentId}/subjects/${subjectid}`)
  }

  const renderMCQ = () => {
    return (
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        {questions.length &&
          questions.map(({ text, answers, id }) => (
            <div key={id}>
              <Row>{text}</Row>

              <Form.Item
                name={id}
                rules={[
                  { required: true, message: 'Please select an answer!' },
                ]}
              >
                <Radio.Group>
                  {answers.map(({ text, id }, i) => (
                    <Radio
                      style={{
                        display: 'block',
                        height: '30px',
                        lineHeight: '30px',
                      }}
                      value={id}
                    >
                      {text}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>
          ))}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: '#B81D9D',
              border: 'none',
            }}
          >
            Finish
          </Button>
        </Form.Item>

        {testDone ? (
          <>
            <p>{'You want to take another test?'.toUpperCase()}</p>
            <Button
              type="primary"
              style={{
                width: 160,
                backgroundColor: '#4BC0E7',
                marginRight: 20,
              }}
              onClick={doAnotherTest}
            >
              yes
            </Button>
            <Button
              type="primary"
              style={{
                width: 160,
                backgroundColor: '#B81D9D',
              }}
              onClick={goToMain}
            >
              no
            </Button>
          </>
        ) : null}
      </Form>
    )
  }

  return (
    <>
      <NavigationPrompt
        beforeConfirm={(clb) => {
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
      </NavigationPrompt>

      <Content
        className="site-layout-content"
        style={{ padding: 90, height: 80, overflow: 'scroll' }}
      >
        {renderMCQ()}
      </Content>
    </>
  )
}
