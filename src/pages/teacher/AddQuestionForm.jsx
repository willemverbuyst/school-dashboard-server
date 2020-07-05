import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTeacherSubjects,
  selectTeacherToken,
  selectTeacherId,
} from '../../store/teacher/selectors';
import { createQuestion } from '../../store/questions/actions';
import { Layout, Form, Input, Button, Select, Row, Col } from 'antd';

const { Content } = Layout;
const { Option } = Select;

export default function Addquestion() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectTeacherToken);
  const teacherId = useSelector(selectTeacherId);
  const subjects = useSelector(selectTeacherSubjects);
  const [subject, setSubject] = useState(1);
  const [question, setQuestion] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  const handleChange = (value) => {
    setSubject(value);
  };

  const addQuestion = () => {
    dispatch(
      createQuestion(subject, question, answer1, answer2, answer3, answer4)
    );
    history.push(`/teachers/${teacherId}/questions/list`);
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', height: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="center" style={{ padding: '24px' }}>
            {'Select a subject and fill in the data to create a new question.'.toUpperCase()}
          </Row>

          <Row justify="center">
            <Col style={{ width: 650 }}>
              <Form name="basic" initialValues={{ remember: true }}>
                {subjects ? (
                  <Form.Item
                    name="subject"
                    rules={[
                      { required: true, message: 'Please select a subject' },
                    ]}
                  >
                    <Select
                      placeholder="select a subject"
                      value={subject}
                      onChange={(e) => handleChange(e)}
                    >
                      {subjects.map(({ name, id }, i) => (
                        <Option key={i} value={id}>
                          {name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null}

                <Form.Item
                  name="Question"
                  rules={[
                    { required: true, message: 'Please input a question!' },
                  ]}
                >
                  <Input
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="Correct answer"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the correct answer',
                    },
                  ]}
                >
                  <Input
                    placeholder="Correct answer"
                    value={answer1}
                    onChange={(e) => setAnswer1(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="Wrong answer #1"
                  rules={[
                    { required: true, message: 'Please input a wrong answer' },
                  ]}
                >
                  <Input
                    placeholder="Wrong answer #1"
                    value={answer2}
                    onChange={(e) => setAnswer2(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="Wrong answer #2"
                  rules={[
                    { required: true, message: 'Please input a wrong answer' },
                  ]}
                >
                  <Input
                    placeholder="Wrong answer #2"
                    value={answer3}
                    onChange={(e) => setAnswer3(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="Wrong answer #3"
                  rules={[
                    { required: true, message: 'Please input a wrong answer' },
                  ]}
                >
                  <Input
                    placeholder="Wrong answer #3"
                    value={answer4}
                    onChange={(e) => setAnswer4(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{
                      backgroundColor: '#B81D9D',
                      border: 'none',
                    }}
                    type="primary"
                    htmlType="submit"
                    onClick={addQuestion}
                  >
                    Add question to the list
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
