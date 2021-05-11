import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentId } from '../../store/student/selectors';
import { selectTeacherId } from '../../store/teacher/selectors';
import { loginStudent } from '../../store/student/actions';
import { loginTeacher } from '../../store/teacher/actions';
import { Layout, Form, Button, Radio, Row, Col } from 'antd';
import TextInput from '../../components/form/TextInput';
import PasswordInput from '../../components/form/PasswordInput';
import { ButtonEvent } from '../../models/events.models';

const { Content } = Layout;

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const studentId = useSelector(selectStudentId);
  const teacherId = useSelector(selectTeacherId);

  useEffect(() => {
    if (studentId !== null) {
      history.push(`/students/${studentId}`);
    }
    if (teacherId !== null) {
      history.push(`/teachers/${teacherId}`);
    }
  }, [studentId, teacherId, history]);

  const submitForm = (event: ButtonEvent): void => {
    event.preventDefault();
    status === 1
      ? dispatch(loginStudent(email, password, status))
      : dispatch(loginTeacher(email, password, status));
  };

  return (
    <Layout style={{ padding: '24px', height: '92vh' }}>
      <Content className="site-layout-background" style={{ padding: 90 }}>
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
                <Link style={{ color: '#FF2694' }} to="/signup">
                  Click here to sign up
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={submitForm}
                  style={{ backgroundColor: '#B81D9D', border: 'none' }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
