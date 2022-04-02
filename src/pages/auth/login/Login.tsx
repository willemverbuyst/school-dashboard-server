import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Layout, Form, Button, Row, Col, PageHeader } from 'antd'
import TextInput from '../../../components/form/TextInput'
import PasswordInput from '../../../components/form/PasswordInput'
import { ButtonEvent } from '../../../models/events.models'
import { useAuth } from '../hooks/useAuth'
import { useUser } from '../hooks/useUser'

const { Content } = Layout

export default function Login() {
	const history = useHistory()
	const { login } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { user } = useUser()
	const roleForUrl = user?.data.user.role?.toLowerCase() + 's'

	useEffect(() => {
		if (user !== null) {
			history.push(`/${roleForUrl}/${user.data.user.id}`)
		}
	}, [roleForUrl, user, history])

	const submitForm = (event: ButtonEvent): void => {
		event.preventDefault()
		login(email, password)
	}

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			<Row justify="center">
				<PageHeader title="Login" />
			</Row>
			<Row justify="center">
				<Col style={{ width: 350 }}>
					<Form name="basic" initialValues={{ remember: true }}>
						<TextInput
							name="Email"
							message="Please input your email!"
							value={email}
							updateValue={e => setEmail(e.target.value)}
						/>
						<PasswordInput
							name="Password"
							message="Please input your password!"
							value={password}
							updateValue={e => setPassword(e.target.value)}
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
	)
}
