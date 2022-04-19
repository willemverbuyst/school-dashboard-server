import { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Form, Input, Button, Row, Col } from 'antd'
import { SubjectInput, usePostSubject, useUser } from '../../../../../hooks'

const { Content } = Layout

export default function NewSubjectForm(): ReactElement {
	const [form] = Form.useForm()
	const history = useHistory()
	const { user } = useUser()
	const postSubject = usePostSubject()

	useEffect(() => {
		if (user?.token === null || user?.data.user.role !== 'TEACHER') {
			history.push('/')
		}
	})

	const handleSubmit = ({ subjectName }: SubjectInput): void => {
		postSubject(subjectName)
		form.resetFields()
	}

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			<Row justify="center" style={{ padding: '24px' }}>
				ADD SUBJECT
			</Row>

			<Row justify="center">
				<Col style={{ width: 650 }}>
					<Form
						form={form}
						name="basic"
						initialValues={{ remember: true }}
						onFinish={handleSubmit}
					>
						<Form.Item
							name="subjectName"
							rules={[{ required: true, message: 'Please input a subject!' }]}
						>
							<Input type="text" placeholder="Subject" />
						</Form.Item>

						<Form.Item>
							<Button
								style={{
									backgroundColor: '#B81D9D',
									border: 'none',
								}}
								type="primary"
								htmlType="submit"
							>
								Add Subject to the curriculum
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</Content>
	)
}
