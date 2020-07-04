import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Form, Button, Select, Collapse } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTeacherSubjects,
  selectTeacherToken,
} from '../../store/teacher/selectors';
import { getQuestionsForSubject } from '../../store/questions/actions';
import { selectAllQuestionsForSubject } from '../../store/questions/selectors';

const { Content } = Layout;
const { Option } = Select;
const { Panel } = Collapse;

export default function ListOfQuestions() {
  const dispatch = useDispatch();
  const subjects = useSelector(selectTeacherSubjects);
  const questions = useSelector(selectAllQuestionsForSubject);
  const [subject, setSubject] = useState(0);
  const history = useHistory();
  const token = useSelector(selectTeacherToken);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  const getListOfQuestions = () => {
    dispatch(getQuestionsForSubject(subject));
  };

  const renderQuestions = () => {
    return (
      <Collapse>
        {questions.map(({ text, answers }, i) => (
          <Panel header={text} key={i}>
            <ol>
              {answers.map(({ text, correct }, i) => (
                <li
                  key={i}
                  style={
                    !correct
                      ? { color: 'red' }
                      : { color: 'green', fontWeight: 'bold' }
                  }
                >
                  {text}
                </li>
              ))}
            </ol>
          </Panel>
        ))}
      </Collapse>
    );
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 12 },
  };

  const renderSubjectsSelector = () => {
    return (
      <Form {...layout} name="basic" initialValues={{ remember: true }}>
        <Form.Item
          label="Select a subject"
          name="subject"
          rules={[{ required: true, message: 'Please select a subject' }]}
        >
          <Select
            value={subject}
            style={{ width: 120, marginBottom: 15 }}
            onChange={(e) => setSubject(e)}
          >
            {subjects.map(({ name, id }, i) => (
              <Option key={i} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={getListOfQuestions}>
            Show list
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 90,
          }}
        >
          <h3>
            Select a subject to get all the current questions in the database
            for that subject.
          </h3>
          {subjects ? renderSubjectsSelector() : null}
          {questions ? renderQuestions() : null}
        </Content>
      </Layout>
    </Layout>
  );
}
