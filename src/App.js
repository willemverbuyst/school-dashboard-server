import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import BarAtTheTop from './components/BarAtThetop';
import AlertBox from './components/AlertBox';
import Spinner from './components/Spinner';
import Sidebar from './components/sidebar/Sidebar';
import AppRouter from './Approuter';
import { selectAppLoading } from './store/appState/selectors';
import { getStudentWithStoredToken } from './store/student/actions';
import { getTeacherWithStoredToken } from './store/teacher/actions';
import './App.css';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './react-query/queryClient';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getTeacherWithStoredToken());
    dispatch(getStudentWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BarAtTheTop />
        <AlertBox />
        <Layout>
          <Sidebar />
          {isLoading ? <Spinner /> : null}
          <AppRouter />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
