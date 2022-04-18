import { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout } from 'antd'
import { useUser } from '../../../hooks'
import AllCharts from './AllChartsMain'

const { Content } = Layout

export default function StudentMainPage(): ReactElement {
	const history = useHistory()
	const { user } = useUser()
	const testResults = user?.data?.overview?.data || []
	const subjects = user?.data?.subjects?.data || []

	useEffect(() => {
		if (!user || user.token === null) {
			history.push('/')
		}
	}, [user, history])

	return (
		<Content className="site-layout-content">
			<AllCharts subjects={subjects} results={testResults} />
		</Content>
	)
}
