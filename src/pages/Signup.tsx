import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTeachers } from '../store/schoolInfo/actions';
import { selectAllTeachers } from '../store/schoolInfo/selectors';
import { createStudent } from '../store/student/actions';
import { createTeacher } from '../store/teacher/actions';
import { Layout, Form, Input, Button, Radio, Select, Row, Col } from 'antd';
import PasswordInput from '../components/form/PasswordInput';
import TextInput from '../components/form/TextInput';
import { ReactElement } from 'react';

const { Content } = Layout;
const { Option } = Select;

export interface ITeacher {
  name: string;
  id: number;
}

const Signup = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(1);
  const [teacher, setTeacher] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const teachers: ITeacher[] = useSelector(selectAllTeachers);

  useEffect(() => {
    dispatch(fetchAllTeachers);
  }, [dispatch]);

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
          {teachers.map(({ name, id }, i) => (
            <Option key={i} value={id}>
              {name}
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
