import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTeachers } from '../store/schoolInfo/actions';
import { selectAllTeachers } from '../store/schoolInfo/selectors';
import { Layout, Form, Input, Button, Radio, Select } from 'antd';
const { Content } = Layout;
const { Option } = Select;

export default function Signup() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(1);
  const [teacher, setTeacher] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // teacher will be fetched from the back with schoolInfo
  const teachers = useSelector(selectAllTeachers);
  // id will come with the teacher objecjt
  const id = 1;

  console.log(teachers);

  useEffect(() => {
    dispatch(fetchAllTeachers);
  }, [dispatch]);

  const handleChange = (value) => {
    setTeacher(value);
  };

  const createUser = () => {
    console.log('user');
  };

  const renderExtraInput = () => {
    return status === 1 ? (
      <Form.Item
        label="Select your teacher"
        name="Teacher"
        rules={[{ required: true, message: 'Please select your teacher!' }]}
      >
        <Select
          value={teacher}
          style={{ width: 120, marginBottom: 15 }}
          onChange={(e) => handleChange(e)}
        >
          {/* get id from backend later on */}
          {teachers.map((name, i) => (
            <Option key={i} value={id}>
              {name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ) : null;
  };

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

          {teachers ? renderExtraInput() : null}

          <Form.Item
            label="Full name"
            name="Full name"
            rules={[
              { required: true, message: 'Please input your full name!' },
            ]}
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} />
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
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => createUser()}
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
