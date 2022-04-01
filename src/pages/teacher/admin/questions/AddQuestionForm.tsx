import { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTeacherSubjects,
  selectTeacherToken,
  selectTeacherId,
} from '../../../../store/teacher/selectors';
import { createQuestion } from '../../../../store/questions/actions';
import { Layout, Form, Input, Button, Select, Row, Col } from 'antd';
import FormItem from './FormItem';
import { useUser } from '../../../auth/hooks/useUser';

const { Content } = Layout;
const { Option } = Select;

interface IPostNewQuestion {
  subject: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

interface ISubject {
  name: string;
  id: number;
}

const AddQuestionForm = (): ReactElement => {
  const history = useHistory();
  const { user } = useUser();
  const dispatch = useDispatch();
  const teacherId = useSelector(selectTeacherId);
  const subjects: ISubject[] = useSelector(selectTeacherSubjects);
  const [newQuestion, setNewQuestion] = useState<IPostNewQuestion>({
    subject: 1,
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
  });

  useEffect(() => {
    if (user?.token === null || user?.data.user.role !== 'TEACHER') {
      history.push('/');
    }
  });

  const addQuestion = () => {
    dispatch(createQuestion(newQuestion));
  };

  const updateValue = (e: any, value: any) => {
    console.log(e, value);
    // setNewQuestion({
    //   ...newQuestion,
    //   answer1: e.target.value,
    // });
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
                      value={newQuestion.subject}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, subject: e })
                      }
                    >
                      {subjects.map(({ name, id }, i) => (
                        <Option key={i} value={id}>
                          {name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null}
                <FormItem
                  name="Question"
                  message="Please input a question!"
                  value={newQuestion.question}
                  updateValue={updateValue}
                />

                <Form.Item
                  name="Question"
                  rules={[
                    { required: true, message: 'Please input a question!' },
                  ]}
                >
                  <Input
                    placeholder="Question"
                    value={newQuestion.question}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        question: e.target.value,
                      })
                    }
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
                    value={newQuestion.answer1}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        answer1: e.target.value,
                      })
                    }
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
                    value={newQuestion.answer2}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        answer2: e.target.value,
                      })
                    }
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
                    value={newQuestion.answer3}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        answer3: e.target.value,
                      })
                    }
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
                    value={newQuestion.answer4}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        answer4: e.target.value,
                      })
                    }
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
};

export default AddQuestionForm;
