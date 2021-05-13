import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DoughnutChart from '../../../components/charts/DoughnutChart';
import SortAndSelect from '../../../components/SortAndSelect';
import { getSubjectForOverview } from '../../../store/overviewTeacher/actions';
import { selectSubjectOverview } from '../../../store/overviewTeacher/selectors';
import {
  selectTeacherStudents,
  selectTeacherToken,
} from '../../../store/teacher/selectors';

import { Layout, Row, Col } from 'antd';
import BarChartTests from './BarChartTests';

const { Content } = Layout;

export default function TeacherSubjectDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const { subjectid } = useParams();
  const results = useSelector(selectSubjectOverview);
  const students = useSelector(selectTeacherStudents);
  const [selectionAverage, setSelectionAverage] = useState('name');
  const [selectStudentAverage, setSelectStudentAverage] = useState('');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getSubjectForOverview(subjectid));
  }, [dispatch, subjectid]);

  const renderCharts = () => {
    const sortedResults =
      selectionAverage === 'name'
        ? [...results].sort((a, b) => a.name.localeCompare(b.name))
        : [...results].sort((a, b) => b.score - a.score);

    const filteredResults = selectStudentAverage
      ? sortedResults.filter((result) => result.name === selectStudentAverage)
      : sortedResults;

    return filteredResults.map(({ score, name }, i) => (
      <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
        <DoughnutChart
          data={[score, 100 - score]}
          color={['#008080', '#eee']}
          title={`${name} ${score}%`}
        />
      </Col>
    ));
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {results ? (
            <SortAndSelect
              title="AVERAGE GRADES"
              radio1="Name"
              radio2="Average"
              onChangeRadio={setSelectionAverage}
              value={selectStudentAverage || undefined}
              onChangeSelection={setSelectStudentAverage}
              results={results}
              selectStudentData={selectStudentAverage}
              onClick={() => setSelectStudentAverage('')}
              placeholder="Select a student"
              textBtn="All students"
            />
          ) : null}
          <Row justify={'space-around'}>
            {results && students ? renderCharts() : null}
          </Row>

          {results && students ? <BarChartTests results={results} /> : null}
        </Content>
      </Layout>
    </Layout>
  );
}
