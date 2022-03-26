import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createStudent } from '../../../store/student/actions';
import { createTeacher } from '../../../store/teacher/actions';
import { Layout, Form, Input, Button, Radio, Select, Row, Col } from 'antd';
import PasswordInput from '../../../components/form/PasswordInput';
import TextInput from '../../../components/form/TextInput';
import { ReactElement } from 'react';
import { useTeachers } from './hooks/useTeachers';
import { useSchools } from './hooks/useSchools';

const { Content } = Layout;
const { Option } = Select;

const Signup = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [school, setSchool] = useState<string>('');
  const [status, setStatus] = useState(1);
  const [teacher, setTeacher] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const schools = useSchools();
  const teachers = useTeachers();

  const createUser = (): void => {
    if (status === 1) {
      dispatch(createStudent(status, name, email, password, teacher));
      history.push(`/`);
    } else {
      dispatch(createTeacher(status, name, email, password));
      history.push(`/`);
    }
  };

  const renderExtraInput = (): ReactElement => {
    return (
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
          {teachers.map(({ user: { userName }, id }, i) => (
            <Option key={i} value={id}>
              {userName}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
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

              <Form.Item
                name="School"
                rules={[{ required: true, message: 'Please select a school!' }]}
              >
                <Select
                  placeholder="Select a school"
                  value={school}
                  style={{ width: 350 }}
                  onChange={(e) => setSchool(e)}
                >
                  {schools.map(({ name, id }, i) => (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {teachers && status === 1 ? renderExtraInput() : null}

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
              <TextInput
                name="Email"
                message="Please input your email!"
                value={email}
                updateValue={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                name="Password"
                message="Please input your password!"
                value={password}
                updateValue={(e) => setPassword(e.target.value)}
              />
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
};

export default Signup;
