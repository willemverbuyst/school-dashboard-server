import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentId } from '../store/student/selectors';
import { loginStudent } from '../store/student/actions';

import { Layout, Form, Input, Button, Radio } from 'antd';
const { Content } = Layout;

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // hardcoded for now, if someone if logged in go to their main page
  const studentId = useSelector(selectStudentId);
  const teacherId = null;

  useEffect(() => {
    if (studentId !== null) {
      history.push(`/students/${studentId}`);
    }
    if (teacherId !== null) {
      history.push(`/teachers/${teacherId}`);
    }
  }, [studentId, teacherId, history]);

  function submitForm(event) {
    event.preventDefault();
    console.log('login', status, email, password);
    status === 1
      ? dispatch(loginStudent(email, password, status))
      : console.log('person loggin in is teacher');
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  return (
    <Layout style={{ padding: '24px', height: '92vh' }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 90,
        }}
      >
        <Form {...layout} name="basic" initialValues={{ remember: true }}>
          <Form.Item {...tailLayout}>
            <Radio.Group
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <Radio value={1}>Student</Radio>
              <Radio value={2}>Teacher</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Link to="/signup">Click here to sign up</Link>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={submitForm}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
