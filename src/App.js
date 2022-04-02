import { useSelector } from 'react-redux'
import { Layout } from 'antd'
import BarAtTheTop from './components/BarAtThetop'
import Spinner from './components/Spinner'
import Sidebar from './components/sidebar/Sidebar'
import AppRouter from './Approuter'
import { selectAppLoading } from './store/appState/selectors'
import './App.css'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from './react-query/queryClient'

function App() {
	const isLoading = useSelector(selectAppLoading)

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Layout style={{ minHeight: '100vh' }}>
					<BarAtTheTop />
					<Layout>
						<Sidebar />
						{/* {isLoading ? <Spinner /> : null} */}
						<Layout className="site-layout-background">
							<AppRouter />
						</Layout>
					</Layout>
				</Layout>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	)
}

export default App
