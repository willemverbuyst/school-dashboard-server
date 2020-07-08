import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTeacherToken,
  selectTeacherId,
} from '../../store/teacher/selectors';
import { createSubject } from '../../store/teacher/actions';
import { Layout, Form, Input, Button, Row, Col } from 'antd';

const { Content } = Layout;

export default function AddSubject() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectTeacherToken);
  const teacherId = useSelector(selectTeacherId);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  const addSubject = () => {
    dispatch(createSubject(subject));
    history.push(`/teachers/${teacherId}/`);
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', height: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="center" style={{ padding: '24px' }}>
            {'Add a subject'.toUpperCase()}
          </Row>

          <Row justify="center">
            <Col style={{ width: 650 }}>
              <Form name="basic" initialValues={{ remember: true }}>
                <Form.Item
                  name="Question"
                  rules={[
                    { required: true, message: 'Please input a subject!' },
                  ]}
                >
                  <Input
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
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
                    onClick={addSubject}
                  >
                    Add Subject to the curriculum
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
