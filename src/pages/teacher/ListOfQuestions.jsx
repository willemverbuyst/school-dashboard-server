import React, { useState } from 'react';
import { Layout, Form, Button, Select } from 'antd';
import { useSelector } from 'react-redux';
import { selectTeacherSubjects } from '../../store/teacher/selectors';

const { Content } = Layout;
const { Option } = Select;

export default function ListOfQuestions() {
  const subjects = useSelector(selectTeacherSubjects);
  const [subject, setSubject] = useState('');

  const handleChange = (value) => {
    console.log(value);
    setSubject(value);
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
            onChange={(e) => handleChange(e)}
          >
            {subjects.map(({ name, id }, i) => (
              <Option key={i} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
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
          {subjects ? renderSubjectsSelector() : null}
        </Content>
      </Layout>
    </Layout>
  );
}
