import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMainOverview,
  selectMainOverviewScatter,
} from '../../../store/overviewTeacher/selectors';
import { getMainOverview } from '../../../store/overviewTeacher/actions';
import { Layout, Row } from 'antd';
import BarChartMain from './BarChartMain';
import LineChartMain from './LineChartMain';
import PieChartMain from './PieChartMain';
import ScatterChartMain from './ScatterChartMain';
import Spinner from '../../../components/Spinner';
import { useUser } from '../../auth/hooks/useUser';

const { Content } = Layout;

const MainPage: React.FC = (): ReactElement => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const history = useHistory();
  const mainPageData = useSelector(selectMainOverview);
  const subjects = user?.data.subjects;
  const tests = useSelector(selectMainOverviewScatter);

  useEffect(() => {
    if (user?.token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    // dispatch(getMainOverview());
  }, [dispatch]);

  const renderCharts = (): JSX.Element => {
    return subjects ? (
      // return mainPageData && tests && subjects ? (
      <>
        TEACHER
        {/* <Row justify="space-around">
          <BarChartMain scores={mainPageData} subjects={subjects} />
          <PieChartMain tests={tests} />
        </Row>
        <Row justify="space-around">
          <LineChartMain tests={tests} />
          <ScatterChartMain tests={tests} />
        </Row> */}
      </>
    ) : (
      <Spinner />
    );
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">{renderCharts()}</Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;
