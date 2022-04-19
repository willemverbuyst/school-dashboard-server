import { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form, Layout, Row, Select } from 'antd'
import QuestionsAndAnswers from './QuestionsAndAnswers'
import Spinner from '../../../../../components/Spinner'
import { useQuestions, useUser } from '../../../../../hooks'

const { Content } = Layout
const { Option } = Select

export default function ListOfQuestions(): ReactElement {
	const [form] = Form.useForm()
	const history = useHistory()
	const { user } = useUser()
	const subjects = user?.data.subjects.data
	const { filter, setFilter, questions } = useQuestions()

	useEffect(() => {
		if (user?.token === null || user?.data.user.role !== 'TEACHER') {
			history.push('/')
		}
	})

	const getListOfQuestions = ({ subject }: { subject: string }): void => {
		setFilter(subject)
	}

	const renderQuestions = (): ReactElement | null =>
		questions ? (
			<Row justify="center">
				<QuestionsAndAnswers questions={questions} />
			</Row>
		) : null

	return (
		<Content className="site-layout-content" style={{ padding: 90 }}>
			{subjects ? (
				<>
					<Row justify="center" style={{ padding: '24px' }}>
						SELEXT A SUBJECT TO GET ALL THE CURRENT QUESTIONS IN THE DATABASE
						FOR THAT SUBJECT
					</Row>

					<Row justify="center">
						<Form
							form={form}
							name="basic"
							initialValues={{ remember: true }}
							onValuesChange={getListOfQuestions}
						>
							<Form.Item
								name="subject"
								rules={[{ required: true, message: 'Please select a subject' }]}
							>
								<Select placeholder="all subjects" style={{ width: 160 }}>
									{subjects.map(({ name, id }, i) => (
										<Option key={i} value={id}>
											{name}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Form>

						{filter !== 'all' ? (
							<Button onClick={() => setFilter('all')}>All</Button>
						) : null}
					</Row>
				</>
			) : (
				<Spinner />
			)}
			{renderQuestions()}
		</Content>
	)
}
