import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import BarAtTheTop from './components/BarAtThetop';
import AlertBox from './components/AlertBox';
import Spinner from './components/Spinner';
import Sidebar from './components/Sidebar';
import AppRouter from './Approuter';
import { selectAppLoading } from './store/appState/selectors';
import { getStudentWithStoredToken } from './store/student/actions';
import { getTeacherWithStoredToken } from './store/teacher/actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getTeacherWithStoredToken());
    dispatch(getStudentWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <BarAtTheTop />
      <AlertBox />
      <Layout>
        <Sidebar />
        {isLoading ? <Spinner /> : null}
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
