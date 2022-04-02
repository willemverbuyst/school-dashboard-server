import { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout } from 'antd'
import { useUser } from '../../auth/hooks/useUser'
import { useMain } from '../hooks/useMain'
import AllCharts from './AllChartsMain'

const { Content } = Layout

const StudentMainPage = (): ReactElement => {
	const history = useHistory()
	const { user } = useUser()
	const testResults = useMain()
	const subjects = user?.data.subjects.data

	useEffect(() => {
		if (!user || user.token === null) {
			history.push('/')
		}
	}, [user, history])

	return (
		<Content className="site-layout-content">
			test
			{user && subjects ? (
				<AllCharts subjects={subjects} results={testResults} />
			) : null}
		</Content>
	)
}

export default StudentMainPage
