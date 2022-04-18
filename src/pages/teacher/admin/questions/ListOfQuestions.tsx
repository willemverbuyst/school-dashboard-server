import { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Layout, Row } from 'antd'
import QuestionsAndAnswers from './QuestionsAndAnswers'
import Spinner from '../../../../components/Spinner'
import { useQuestions, useUser } from '../../../../hooks/'
import SubjectSelector from './SubjectSelector'

const { Content } = Layout

const ListOfQuestions = (): ReactElement => {
	const history = useHistory()
	const { user } = useUser()
	const subjects = user?.data.subjects.data
	const { filter, setFilter, questions } = useQuestions()

	useEffect(() => {
		if (user?.token === null || user?.data.user.role !== 'TEACHER') {
			history.push('/')
		}
	})

	const getListOfQuestions = (subjectId: string): void => {
		setFilter(subjectId)
	}

	const renderQuestions = (): ReactElement | null =>
		questions ? (
			<Row justify="center">
				<QuestionsAndAnswers questions={questions} />
			</Row>
		) : null

	return (
		<Layout>
			<Layout style={{ padding: '24px', minHeight: '92vh' }}>
				<Content className="site-layout-background">
					{subjects ? (
						<>
							<Row justify="center" style={{ padding: '24px' }}>
								{'Select a subject to get all the current questions in the database for that subject.'.toUpperCase()}
							</Row>
							<Row justify="center">
								<SubjectSelector
									subject={filter}
									subjects={subjects}
									changeSubject={getListOfQuestions}
								/>
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
			</Layout>
		</Layout>
	)
}

export default ListOfQuestions
