import { Layout } from 'antd'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import AppRouter from './Approuter'
import BarAtTheTop from './components/barAtTheTop'
import { Sidebar } from './components/sidebar'
import { queryClient } from './react-query/queryClient'

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout style={{ minHeight: '100vh' }}>
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
