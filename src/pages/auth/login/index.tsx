import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Col, Form, Input, Layout, Row } from 'antd'
import { useAuth, useUser } from '../../../hooks'

const { Content } = Layout

interface LoginInput {
	email: string
	password: string
}

export default function Login() {
	const [form] = Form.useForm()
	const history = useHistory()
	const { login } = useAuth()
	const { user } = useUser()
	const roleForUrl = user?.data.user.role?.toLowerCase() + 's'

	useEffect(() => {
		if (user !== null) {
			history.push(`/${roleForUrl}/${user.data.user.id}`)
		}
	}, [roleForUrl, user, history])

	const handleSubmit = ({ email, password }: LoginInput): void => {
		login(email, password)
		form.resetFields()
	}

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			<Row justify="center" style={{ padding: '24px' }}>
				LOGIN
			</Row>
			<Row justify="center">
				<Col style={{ width: 350 }}>
					<Form
						form={form}
						name="basic"
						initialValues={{ remember: true }}
						onFinish={handleSubmit}
					>
						<Form.Item
							name="email"
							rules={[{ required: true, message: 'Please enter your email!' }]}
						>
							<Input placeholder="Email" />
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{ required: true, message: 'Please enter your password!' },
							]}
						>
							<Input.Password placeholder="Password" />
						</Form.Item>

						<Form.Item>
							<Link style={{ color: '#FF2694' }} to="/signup">
								Click here to sign up
							</Link>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ backgroundColor: '#B81D9D', border: 'none' }}
							>
								Login
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</Content>
	)
}
