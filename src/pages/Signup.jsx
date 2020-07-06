import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTeachers } from '../store/schoolInfo/actions';
import { selectAllTeachers } from '../store/schoolInfo/selectors';
import { createStudent } from '../store/student/actions';
import { createTeacher } from '../store/teacher/actions';
import { Layout, Form, Input, Button, Radio, Select, Row, Col } from 'antd';
const { Content } = Layout;
const { Option } = Select;

export default function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(1);
  const [teacher, setTeacher] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const teachers = useSelector(selectAllTeachers);

  useEffect(() => {
    dispatch(fetchAllTeachers);
  }, [dispatch]);

  const createUser = () => {
    if (status === 1) {
      dispatch(createStudent(status, name, email, password, teacher));
      history.push(`/`);
    } else {
      dispatch(createTeacher(status, name, email, password));
      history.push(`/`);
    }
  };

  const renderExtraInput = () => {
    return status === 1 ? (
      <Form.Item
        name="Teacher"
        rules={[{ required: true, message: 'Please select your teacher!' }]}
      >
        <Select
          placeholder="Select your teacher"
          value={teacher}
          style={{ width: 350 }}
          onChange={(e) => setTeacher(e)}
        >
          {teachers.map(({ name, id }, i) => (
            <Option key={i} value={id}>
              {name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ) : null;
  };

  return (
    <Layout style={{ padding: '24px', height: '92vh' }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 90,
        }}
      >
        <Row justify="center">
          <Col style={{ width: 350 }}>
            <Form name="basic" initialValues={{ remember: true }}>
              <Form.Item>
                <Radio.Group
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <Radio value={1}>Student</Radio>
                  <Radio value={2}>Teacher</Radio>
                </Radio.Group>
              </Form.Item>

              {teachers ? renderExtraInput() : null}

              <Form.Item
                name="Full name"
                rules={[
                  { required: true, message: 'Please input your full name!' },
                ]}
              >
                <Input
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => createUser()}
                  style={{ backgroundColor: '#B81D9D', border: 'none' }}
                >
                  Signup
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
