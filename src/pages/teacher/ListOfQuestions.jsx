import React, { useState } from 'react';
import { Layout, Form, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectTeacherSubjects } from '../../store/teacher/selectors';
import { getQuestionsForSubject } from '../../store/questions/actions';

const { Content } = Layout;
const { Option } = Select;

export default function ListOfQuestions() {
  const dispatch = useDispatch();
  const subjects = useSelector(selectTeacherSubjects);
  const [subject, setSubject] = useState('');

  const getListOfQuestions = () => {
    dispatch(getQuestionsForSubject(subject));
  };

  const renderSubjectsSelector = () => {
    return (
      <Form name="basic" initialValues={{ remember: true }}>
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

        <Button type="primary" htmlType="submit" onClick={getListOfQuestions}>
          Show list
        </Button>
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
        </Content>
      </Layout>
    </Layout>
  );
}
