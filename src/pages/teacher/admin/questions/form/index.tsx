import { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Form, Input, Button, Select, Row, Col } from 'antd'
import { useUser } from '../../../../../hooks'

const { Content } = Layout
const { Option } = Select

interface IPostNewQuestion {
	subject: number
	question: string
	answer1: string
	answer2: string
	answer3: string
	answer4: string
}

const AddQuestionForm = (): ReactElement => {
	const [form] = Form.useForm()
	const history = useHistory()
	const { user } = useUser()

	const subjects = user?.data.subjects.data || []

	useEffect(() => {
		if (user?.token === null || user?.data.user.role !== 'TEACHER') {
			history.push('/')
		}
	})

	const handleSubmit = input => {
		console.log('input :>> ', input)
		form.resetFields()
	}

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			<Row justify="center" style={{ padding: '24px' }}>
				SELECT A SUBJECT AND CREATE A NEW QUESTION WITH ANSWERS
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
							name="subject"
							rules={[{ required: true, message: 'Please select a subject' }]}
						>
							<Select placeholder="select a subject">
								{subjects.map(({ name, id }, i) => (
									<Option key={i} value={id}>
										{name}
									</Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							name="question"
							rules={[{ required: true, message: 'Please enter a question!' }]}
						>
							<Input placeholder="Question" />
						</Form.Item>

						<Form.Item
							name="correctAnswer"
							rules={[
								{
									required: true,
									message: 'Please input the correct answer',
								},
							]}
						>
							<Input placeholder="Correct answer" />
						</Form.Item>

						<Form.Item
							name="wrongAnswer1"
							rules={[
								{ required: true, message: 'Please input a wrong answer' },
							]}
						>
							<Input placeholder="Wrong answer #1" />
						</Form.Item>

						<Form.Item
							name="wrongAnswer3"
							rules={[
								{ required: true, message: 'Please input a wrong answer' },
							]}
						>
							<Input placeholder="Wrong answer #2" />
						</Form.Item>

						<Form.Item
							name="wrongAnswer3"
							rules={[
								{ required: true, message: 'Please input a wrong answer' },
							]}
						>
							<Input placeholder="Wrong answer #3" />
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
								Add question to the list
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</Content>
	)
}

export default AddQuestionForm
