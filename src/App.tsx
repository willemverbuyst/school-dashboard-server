import { Layout } from 'antd'
import BarAtTheTop from './components/BarAtThetop'
import Spinner from './components/spinner'
import Sidebar from './components/sidebar'
import AppRouter from './Approuter'
import './App.css'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from './react-query/queryClient'

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Layout style={{ minHeight: '100vh' }}>
					<Spinner />
					<BarAtTheTop />
					<Layout>
						<Sidebar />
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
